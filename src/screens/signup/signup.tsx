import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useSignup } from './useSignup'
import { Button, Form, H2, P, Text, TextField } from '@/components'

export function SignUp() {
  const { methods, handleBack, handleGoogleSignup, handleSignup } = useSignup()

  return (
    <Form {...methods}>
      <SafeAreaView className="flex flex-1 p-4 bg-background gap-6">
        <View>
          <TouchableOpacity
            onPress={handleBack}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-2 items-center mb-4">
          <FontAwesome6 name="dumbbell" size={24} color="black" />
          <View className="flex flex-row">
            <Text className="font-bold text-3xl">Vigor</Text>
            <Text className="text-3xl">mancer</Text>
          </View>
        </View>
        <View>
          <H2>Signup</H2>
          <P className="text-muted-foreground">
            Enter your email and password to create an account
          </P>
        </View>
        <View className="gap-4">
          <TextField control={methods.control} name="username" placeholder="Username" size="lg" />
          <TextField control={methods.control} name="email" placeholder="Email" size="lg" />
          <TextField
            control={methods.control}
            name="password"
            placeholder="Password"
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
          <TextField
            control={methods.control}
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            secureTextEntry={!methods.watch('showConfirmPassword')}
            size="lg"
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
        <View className="gap-2">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleSignup)}>
            <Text>Register</Text>
          </Button>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 border-t border-border" />
            <Text>Or</Text>
            <View className="flex-1 border-t border-border" />
          </View>
          <Button
            size="lg"
            variant="outline"
            startIcon={<FontAwesome6 name="google" size={16} />}
            onPress={handleGoogleSignup}
          >
            <Text>Signup with Google</Text>
          </Button>
        </View>
        <View className="pb-8 justify-center items-center flex flex-row gap-1">
          <Text>Already have an account?</Text>
          <TouchableOpacity>
            <Text className="font-bold" onPress={handleBack}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Form>
  )
}
