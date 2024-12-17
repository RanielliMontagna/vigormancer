import { TouchableOpacity, View } from 'react-native'
import { useLogin } from './useLogin'

import { Button, Form, H2, P, Text, TextField } from '@/components'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useColorScheme } from '@/hooks'

export function Login() {
  const { methods, handleLogin, handleGoogleLogin, handleGoToForgotPassword, handleGoToSignup } =
    useLogin()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6">
        <View className="flex flex-row gap-2 items-center mb-4">
          <FontAwesome6 name="dumbbell" size={24} color={isDarkColorScheme ? 'white' : 'black'} />
          <View className="flex flex-row">
            <Text className="font-bold text-3xl">Vigor</Text>
            <Text className="text-3xl">mancer</Text>
          </View>
        </View>
        <View>
          <H2>Login</H2>
          <P className="text-muted-foreground">Enter your email and password to login</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="email"
            placeholder="Enter your email"
            size="lg"
          />
          <TextField
            control={methods.control}
            name="password"
            placeholder="Enter your password"
            type="password"
            secureTextEntry={!methods.watch('showPassword')}
            size="lg"
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
          <View className="flex items-end">
            <TouchableOpacity onPress={handleGoToForgotPassword}>
              <Text className="text-sm text-muted-foreground">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="gap-2">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleLogin)}>
            <Text>Login</Text>
          </Button>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 border-t border-border" />
            <Text>Or</Text>
            <View className="flex-1 border-t border-border" />
          </View>
          <Button
            size="lg"
            variant="outline"
            startIcon={
              <FontAwesome6 name="google" size={16} color={isDarkColorScheme ? 'white' : 'black'} />
            }
            onPress={handleGoogleLogin}
          >
            <Text>Continue with Google</Text>
          </Button>
        </View>
        <View className="pb-8 justify-center items-center flex flex-row gap-1">
          <Text>Don’t have an account?</Text>
          <TouchableOpacity>
            <Text className="font-bold" onPress={handleGoToSignup}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Form>
  )
}
