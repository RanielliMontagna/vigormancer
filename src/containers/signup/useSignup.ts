import { router } from 'expo-router'

export function useSignup() {
  function handleLogin() {
    router.back()
  }

  return { handleLogin }
}
