import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/react-query'

const Wrapper = ({ children }) => (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
)

export { Wrapper }
