import { TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, Form, H2, P, Text, TextField } from '@/components'
import { useForgotPassword } from './useForgotPassword'

export function ForgotPassword() {
  const { methods, handleSendCode, handleBack } = useForgotPassword()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6">
        <View>
          <TouchableOpacity
            onPress={handleBack}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <H2>Forgot Password?</H2>
          <P className="text-muted-foreground">
            Don't worry! It occurs. Please enter the email address linked with your account.
          </P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="email"
            placeholder="Enter your email"
            size="lg"
          />
        </View>
        <View className="gap-4">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleSendCode)}>
            <Text>Send Code</Text>
          </Button>
          <View className="pb-8 justify-center items-center flex flex-row gap-1">
            <Text>Remebered your password?</Text>
            <TouchableOpacity>
              <Text className="font-bold" onPress={handleBack}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Form>
  )
}
