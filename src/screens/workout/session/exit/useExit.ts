import { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { useRouter } from 'expo-router'

export function useExit() {
  const { back } = useRouter()
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  useEffect(() => {
    const backAction = () => {
      setIsDialogVisible(true)
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  const handleCancel = () => {
    setIsDialogVisible(false)
  }

  const handleExit = () => {
    setIsDialogVisible(false)
    back()
  }

  return {
    isDialogVisible,
    handleCancel,
    handleExit,
  }
}
