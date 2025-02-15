import { act, fireEvent, render } from '@/utils'

import { General } from './general'
import { router } from 'expo-router'

describe('General', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<General />)
    expect(getByTestId('general')).toBeDefined()
  })

  it('should call router.push when handleGoToUpdateInformation is called', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = render(<General />)
    const updateInformation = getByTestId('update-information')

    act(() => {
      fireEvent.press(updateInformation)
    })

    expect(router.push).toHaveBeenCalledWith('(private)/update-informations')
  })

  it('should call router.push when handleGoToChangePassword is called', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = render(<General />)
    const changePassword = getByTestId('change-password')

    act(() => {
      fireEvent.press(changePassword)
    })

    expect(router.push).toHaveBeenCalledWith('(private)/change-password')
  })
})
