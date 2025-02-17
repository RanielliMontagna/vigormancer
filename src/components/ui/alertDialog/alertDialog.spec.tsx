import { act, fireEvent, renderWithProviders } from '@/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alertDialog'

jest.mock('expo-font', () => ({
  ...jest.requireActual('react-native'),
  Platform: {
    select: jest.fn(() => 'web'),
  },
}))

describe('@components/ui/alertDialog', () => {
  it('should be able to render alert dialog', async () => {
    const { getByTestId } = renderWithProviders(
      <AlertDialog>
        <AlertDialogOverlay />
        <AlertDialogTrigger testID="open-alert-dialog">Open me</AlertDialogTrigger>
        <AlertDialogHeader>
          <AlertDialogTitle>Test</AlertDialogTitle>
          <AlertDialogDescription testID="description">Description</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogContent>Test here</AlertDialogContent>
        <AlertDialogFooter>
          <AlertDialogAction>Click here</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialog>,
    )

    await act(() => {
      const alertDialogTrigger = getByTestId('open-alert-dialog')
      fireEvent.press(alertDialogTrigger)
    })

    expect(await getByTestId('description')).toBeDefined()
  })
})
