import { z } from 'zod'
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
  const selectedWeight = methods.watch('weight')

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
    selectedHeight,
    selectedWeight,
    bmiBottomSheetRef,
    handleCancel,
    handleSubmit,
  }
}
