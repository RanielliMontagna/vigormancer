import React, { useCallback } from 'react'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

const BottomSheetComponent = React.forwardRef<
  React.ElementRef<typeof BottomSheetModal>,
  BottomSheetModalProps
>(({ children, ...rest }, ref) => {
  const { isDarkColorScheme } = useColorScheme()

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={1} animatedIndex={{ value: 1 }} />,
    [],
  )

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={false}
      handleStyle={{
        backgroundColor: isDarkColorScheme ? colors.zinc[900] : colors.zinc[100],
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDarkColorScheme ? colors.neutral[500] : colors.neutral[400],
      }}
      {...rest}
    >
      <BottomSheetView className="p-6 bg-background" testID="bottomSheet">
        {children as React.ReactElement}
      </BottomSheetView>
    </BottomSheetModal>
  )
})

BottomSheetComponent.displayName = 'BottomSheet'

export { BottomSheetComponent as BottomSheet }
