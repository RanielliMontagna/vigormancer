import { render, renderHook, RenderOptions } from '@testing-library/react-native'
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

const renderWithProviders = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: ({ children }) => <Wrapper>{children}</Wrapper>, ...options })

const renderHookWithProviders = (hook: () => any, options?: RenderOptions) =>
  renderHook(hook, { wrapper: Wrapper, ...options })

export * from '@testing-library/react-native'

export { renderWithProviders, renderHookWithProviders }
