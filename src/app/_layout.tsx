import { Stack } from 'expo-router'
import '@/styles/global.css'

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
