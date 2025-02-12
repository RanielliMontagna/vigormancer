import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useProgressionContext } from '../../progression.context'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-expo'
import { getLastestWeight } from '@/db/controllers/user/get-weight'
import { useAppStore } from '@/store'
import { updateUserWeight } from '@/db/controllers/user/update-user-weight'
import { queryClient } from '@/libs/react-query'

const WeightBottomSheetSchema = z.object({
  weight: z.number(),
})

type WeightBottomSheetValues = z.infer<typeof WeightBottomSheetSchema>

export function useWeightBottomSheet() {
  const { handleErrors } = useAppStore()
  const { user } = useUser()
  const { weightBottomSheetRef } = useProgressionContext()
  const { data } = useQuery({ queryKey: ['weight'], queryFn: () => getLastestWeight(user.id) })

  const methods = useForm({
    resolver: zodResolver(WeightBottomSheetSchema),
    defaultValues: { weight: data.current },
  })

  const selectedWeight = methods.watch('weight')

  async function handleSubmit(values: WeightBottomSheetValues) {
    try {
      await updateUserWeight({ userId: user.id, weight: values.weight })
      queryClient.invalidateQueries({ queryKey: ['weight'] })
      queryClient.invalidateQueries({ queryKey: ['historyWeight'] })

      weightBottomSheetRef.current?.close()
    } catch (err) {
      handleErrors(err)
    }
  }

  function handleCancel() {
    methods.reset()
    weightBottomSheetRef.current?.close()
  }

  return {
    methods,
    selectedWeight,
    weightBottomSheetRef,
    handleCancel,
    handleSubmit,
  }
}
