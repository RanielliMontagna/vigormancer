import React from 'react'

import { BottomSheetModal, BottomSheetModalProps, BottomSheetView } from '@gorhom/bottom-sheet'

const BottomSheetComponent = React.forwardRef<
  React.ElementRef<typeof BottomSheetModal>,
  BottomSheetModalProps
>(({ children, ...rest }, ref) => {
  return (
    <BottomSheetModal ref={ref} {...rest}>
      <BottomSheetView>{children as React.ReactElement}</BottomSheetView>
    </BottomSheetModal>
  )
})

BottomSheetComponent.displayName = 'BottomSheet'

export { BottomSheetComponent as BottomSheet }
