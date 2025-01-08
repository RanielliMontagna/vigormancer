import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useProgressionContext } from '../../progression.context'

const BmiBottomSheetSchema = z.object({
  height: z.number(),
  weight: z.number(),
})

type BmiBottomSheetValues = z.infer<typeof BmiBottomSheetSchema>

export function useBmiBottomSheet() {
  const { bmiBottomSheetRef } = useProgressionContext()

  const methods = useForm({
    resolver: zodResolver(BmiBottomSheetSchema),
    defaultValues: { height: 170, weight: 70 },
  })

  const selectedHeight = methods.watch('height')
  const heightInitialData = Array.from({ length: 101 }, (_, i) => `${i + 120} cm`)
  const [heightWheelIndex, setHeightWheelIndex] = useState(selectedHeight - 120)

  const selectedWeight = methods.watch('weight')
  const weightInitialData = Array.from({ length: 121 }, (_, i) => `${i + 30} kg`)
  const [weightWheelIndex, setWeightWheelIndex] = useState(selectedWeight - 30)

  function handleSubmit(values: BmiBottomSheetValues) {
    //TODO: Implement BMI route to backend
    console.log('BMI', values)
  }

  function handleCancel() {
    methods.reset()
    bmiBottomSheetRef.current?.close()
  }

  return {
    methods,
    heightWheelIndex,
    weightWheelIndex,
    heightInitialData,
    weightInitialData,
    bmiBottomSheetRef,
    handleCancel,
    handleSubmit,
    setWeightWheelIndex,
    setHeightWheelIndex,
  }
}
