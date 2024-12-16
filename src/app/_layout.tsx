import React from 'react'
import Toast from 'react-native-toast-message'
import { Stack } from 'expo-router'

import '@/styles/global.css'

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast position="bottom" />
    </>
  )
}
