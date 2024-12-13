import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Login() {
  function handleSignup() {
    router.push('/signup')
  }

  return (
    <View className="flex flex-1 justify-center align-center">
      <Text className="text-center text-4xl font-bold text-blue-500">Vigormancer</Text>

      <View className="absolute bottom-0 left-0 right-0 pb-8 justify-center items-center flex flex-row gap-1">
        <Text>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text className="font-bold" onPress={handleSignup}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
