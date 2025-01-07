import React, { useCallback } from 'react'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

const BottomSheetComponent = React.forwardRef<
  React.ElementRef<typeof BottomSheetModal>,
  BottomSheetModalProps
>(({ children, ...rest }, ref) => {
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={1} animatedIndex={{ value: 1 }} />,
    [],
  )

  return (
    <BottomSheetModal ref={ref} backdropComponent={renderBackdrop} {...rest}>
      <BottomSheetView>{children as React.ReactElement}</BottomSheetView>
    </BottomSheetModal>
  )
})

BottomSheetComponent.displayName = 'BottomSheet'

export { BottomSheetComponent as BottomSheet }
