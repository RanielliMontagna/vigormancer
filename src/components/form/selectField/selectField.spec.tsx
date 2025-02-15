import { act, fireEvent, render } from '@/utils'
import { FormProvider, useForm } from 'react-hook-form'

import { SelectField, SelectFieldProps } from './selectField'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks'

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  }
})

const mockUseColorScheme = useColorScheme as jest.Mock

describe('SelectField', () => {
  const SelectWithForm = (props: Partial<SelectFieldProps>) => {
    const methods = useForm()

    return (
      <SafeAreaProvider>
        <FormProvider {...methods}>
          <SelectField
            control={methods.control}
            label="Select"
            name="select"
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 2', group: 'Group 1', image: 'image' },
            ]}
            {...props}
          />
        </FormProvider>
      </SafeAreaProvider>
    )
  }

  it('should render the component', () => {
    const { getByTestId } = render(<SelectWithForm />)

    expect(getByTestId('select')).toBeDefined()
  })

  it('should be able to call onValueChange', () => {
    const { getByTestId } = render(<SelectWithForm />)

    act(() => {
      const select = getByTestId('select')
      fireEvent(select, 'onValueChange', '1')
    })
  })

  it('should be render with darkColorScheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<SelectWithForm />)

    expect(getByTestId('select')).toBeDefined()
  })
})
