import { TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, Form, H2, P, Text, TextField } from '@/components'
import { useResetPassword } from './useResetPassword'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function ResetPassword() {
  const { prevStep } = useForgotPasswordContext()
  const { methods, handleResetPassword } = useResetPassword()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6">
        <View>
          <TouchableOpacity
            onPress={prevStep}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <H2>Create new password</H2>
          <P className="text-muted-foreground">
            Your new password must be unique from those previously used.
          </P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="password"
            placeholder="Enter your new password"
            size="lg"
            secureTextEntry={!methods.watch('showPassword')}
            endAdornment={
              <TouchableOpacity
                onPress={() => methods.setValue('showPassword', !methods.watch('showPassword'))}
              >
                {methods.watch('showPassword') ? (
                  <FontAwesome6 name="eye-slash" size={16} color="gray" />
                ) : (
                  <FontAwesome6 name="eye" size={16} color="gray" />
                )}
              </TouchableOpacity>
            }
          />
          <TextField
            control={methods.control}
            name="confirmPassword"
            placeholder="Confirm your new password"
            size="lg"
            secureTextEntry={!methods.watch('showConfirmPassword')}
            endAdornment={
              <TouchableOpacity
                onPress={() =>
                  methods.setValue('showConfirmPassword', !methods.watch('showConfirmPassword'))
                }
              >
                {methods.watch('showConfirmPassword') ? (
                  <FontAwesome6 name="eye-slash" size={16} color="gray" />
                ) : (
                  <FontAwesome6 name="eye" size={16} color="gray" />
                )}
              </TouchableOpacity>
            }
          />
        </View>
        <View className="gap-4">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleResetPassword)}>
            <Text>Reset Password</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
