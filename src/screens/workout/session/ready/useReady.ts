import { useEffect, useMemo, useState } from 'react'
import { useSessionContext } from '../session.context'

export function useReady() {
  const { nextStep } = useSessionContext()

  const readyToGoCountdown = 15
  const [countdownInSeconds, setCountdownInSeconds] = useState(readyToGoCountdown)

  const fillCountdown = useMemo(
    () => ((readyToGoCountdown - countdownInSeconds) / readyToGoCountdown) * 100,
    [countdownInSeconds],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownInSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdownInSeconds])

  useEffect(() => {
    if (countdownInSeconds === 0) {
      nextStep()
    }
  }, [countdownInSeconds, nextStep])

  return { countdownInSeconds, fillCountdown }
}
