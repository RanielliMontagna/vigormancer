import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

export default function SignUp() {
  function handleLogin() {
    router.back()
  }

  return (
    <View className="flex flex-1 justify-center align-center">
      <Text className="text-center text-4xl font-bold text-blue-500">Vigormancer</Text>

      <View className="absolute bottom-0 left-0 right-0 pb-8 justify-center items-center flex flex-row gap-1">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text className="font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
