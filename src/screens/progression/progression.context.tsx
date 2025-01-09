import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { createContext, useCallback, useContext, useRef } from 'react'

interface ProgressionContextProps {
  bmiBottomSheetRef: React.RefObject<BottomSheetModal>
  handleOpenBmiBottomSheet: () => void

  weightBottomSheetRef: React.RefObject<BottomSheetModal>
  handleOpenWeightBottomSheet: () => void
}

export const ProgressionContext = createContext({} as ProgressionContextProps)

export function ProgressionProvider({ children }) {
  const bmiBottomSheetRef = useRef<BottomSheetModal>(null)
  const weightBottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOpenBmiBottomSheet = useCallback(() => {
    bmiBottomSheetRef.current?.present()
  }, [])

  const handleOpenWeightBottomSheet = useCallback(() => {
    weightBottomSheetRef.current?.present()
  }, [])

  return (
    <ProgressionContext.Provider
      value={{
        bmiBottomSheetRef,
        weightBottomSheetRef,
        handleOpenBmiBottomSheet,
        handleOpenWeightBottomSheet,
      }}
    >
      {children}
    </ProgressionContext.Provider>
  )
}

export function useProgressionContext() {
  const context = useContext(ProgressionContext)

  return context
}
