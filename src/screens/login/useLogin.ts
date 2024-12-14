import { router } from 'expo-router'

export function useLogin() {
  function handleSignup() {
    router.push('/signup')
  }

  return { handleSignup }
}
