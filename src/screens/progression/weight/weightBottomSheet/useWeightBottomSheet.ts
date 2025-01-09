import { z } from 'zod'
import { useState } from 'react'
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
  const weightInitialData = Array.from({ length: 121 }, (_, i) => `${i + 30} kg`)
  const [weightWheelIndex, setWeightWheelIndex] = useState(selectedWeight - 30)

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
    weightWheelIndex,
    weightInitialData,
    weightBottomSheetRef,
    handleCancel,
    handleSubmit,
    setWeightWheelIndex,
  }
}
