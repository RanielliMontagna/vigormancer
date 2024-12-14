import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { resetPasswordSchema, ResetPasswordSchema } from './resetPassword.schema'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function useResetPassword() {
  const { nextStep } = useForgotPasswordContext()

  const methods = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
  })

  function handleResetPassword(data: ResetPasswordSchema) {
    console.log(data)

    //TODO: Reset password

    nextStep()
  }

  return { methods, handleResetPassword }
}
