import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useProgressionContext } from '../../progression.context'

const WeightBottomSheetSchema = z.object({
  weight: z.number(),
})

type WeightBottomSheetValues = z.infer<typeof WeightBottomSheetSchema>

export function useWeightBottomSheet() {
  const { weightBottomSheetRef } = useProgressionContext()

  const methods = useForm({
    resolver: zodResolver(WeightBottomSheetSchema),
    defaultValues: { weight: 70 },
  })

  const selectedWeight = methods.watch('weight')

  function handleSubmit(values: WeightBottomSheetValues) {
    //TODO: Implement weight route to backend
    console.log('Weight', values)
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
