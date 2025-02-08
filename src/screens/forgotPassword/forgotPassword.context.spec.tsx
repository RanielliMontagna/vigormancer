import { renderHook } from '@testing-library/react-native'
import {
  ForgotPasswordContext,
  ForgotPasswordProvider,
  useForgotPasswordContext,
} from './forgotPassword.context'
import { act } from 'react'

describe('forgotPassword/forgotPassword.context', () => {
  it('should export ForgotPasswordContext', () => {
    expect(ForgotPasswordContext).toBeDefined()
  })

  it('should export ForgotPasswordProvider', () => {
    expect(ForgotPasswordProvider).toBeDefined()
  })

  it('should export useForgotPasswordContext', () => {
    expect(useForgotPasswordContext).toBeDefined()
  })

  it('should return the context', () => {
    const { result } = renderHook(() => useForgotPasswordContext(), {
      wrapper: ForgotPasswordProvider,
    })

    expect(result.current).toEqual({
      email: '',
      step: 0,
      nextStep: expect.any(Function),
      prevStep: expect.any(Function),
      handleSaveEmail: expect.any(Function),
    })
  })

  it('should handle next step', () => {
    const { result } = renderHook(() => useForgotPasswordContext(), {
      wrapper: ForgotPasswordProvider,
    })

    act(() => result.current.nextStep())
    expect(result.current.step).toBe(1)

    act(() => result.current.nextStep())
    expect(result.current.step).toBe(2)

    act(() => result.current.nextStep())
    expect(result.current.step).toBe(3)

    act(() => result.current.nextStep())
    expect(result.current.step).toBe(3)
  })

  it('should handle previous step', () => {
    const { result } = renderHook(() => useForgotPasswordContext(), {
      wrapper: ForgotPasswordProvider,
    })

    act(() => result.current.nextStep())
    expect(result.current.step).toBe(1)

    act(() => result.current.prevStep())
    expect(result.current.step).toBe(0)

    act(() => result.current.prevStep())
    expect(result.current.step).toBe(0)
  })
})
