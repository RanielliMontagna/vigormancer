import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useProgressionContext } from '../../progression.context'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-expo'
import { queryClient } from '@/libs/react-query'
import { useAppStore } from '@/store'
import { getHeight, getLatestWeight, updateUserHeight, updateUserWeight } from '@/db'

const BmiBottomSheetSchema = z.object({
  height: z.number(),
  weight: z.number(),
})

type BmiBottomSheetValues = z.infer<typeof BmiBottomSheetSchema>

export function useBmiBottomSheet() {
  const { user } = useUser()
  const { handleErrors } = useAppStore()
  const { bmiBottomSheetRef } = useProgressionContext()

  const weightQuery = useQuery({ queryKey: ['weight'], queryFn: () => getLatestWeight(user.id) })
  const heightQuery = useQuery({ queryKey: ['height'], queryFn: () => getHeight(user.id) })

  const methods = useForm({
    resolver: zodResolver(BmiBottomSheetSchema),
    defaultValues: { height: heightQuery.data, weight: weightQuery.data?.current },
  })

  const selectedHeight = methods.watch('height')
  const selectedWeight = methods.watch('weight')

  async function handleSubmit(values: BmiBottomSheetValues) {
    if (values.height === heightQuery.data && values.weight === weightQuery.data?.current) {
      bmiBottomSheetRef.current?.close()
      return
    }

    try {
      if (values.height !== heightQuery.data) {
        await updateUserHeight({ userId: user.id, height: values.height })
        queryClient.invalidateQueries({ queryKey: ['height'] })
      }

      if (values.weight !== weightQuery.data?.current) {
        await updateUserWeight({ userId: user.id, weight: values.weight })
        queryClient.invalidateQueries({ queryKey: ['weight'] })
        queryClient.invalidateQueries({ queryKey: ['historyWeight'] })
      }

      bmiBottomSheetRef.current?.close()
    } catch (err) {
      handleErrors(err)
    }
  }

  function handleCancel() {
    methods.reset()
    bmiBottomSheetRef.current?.close()
  }

  return {
    methods,
    selectedHeight,
    selectedWeight,
    bmiBottomSheetRef,
    handleCancel,
    handleSubmit,
  }
}
