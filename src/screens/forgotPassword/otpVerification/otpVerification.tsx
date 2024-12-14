import { TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, Form, H2, P, Text, TextField } from '@/components'
import { useOtpVerification } from './useOtpVerification'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function OtpVerification() {
  const { prevStep } = useForgotPasswordContext()
  const { methods, handleOtpVerification, handleResendCode } = useOtpVerification()

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
          <H2>OTP Verification</H2>
          <P className="text-muted-foreground">
            Enter the verification code we just sent on your email address.
          </P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="otp"
            placeholder="Enter your OTP"
            size="lg"
            type="number"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            maxLength={4}
          />
        </View>
        <View className="gap-4">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleOtpVerification)}>
            <Text>Verify</Text>
          </Button>
          <View className="pb-8 justify-center items-center flex flex-row gap-1">
            <Text>Didn’t received code?</Text>
            <TouchableOpacity>
              <Text className="font-bold" onPress={handleResendCode}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Form>
  )
}
