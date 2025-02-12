import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { lineDataItem } from 'react-native-gifted-charts'
import { useUser } from '@clerk/clerk-expo'

import { getHistoryWeight, getLastestWeight } from '@/db'

export function useWeight() {
  const { user } = useUser()

  const weightQuery = useQuery({ queryKey: ['weight'], queryFn: () => getLastestWeight(user.id) })
  const historyWeightQuery = useQuery({
    queryKey: ['historyWeight'],
    queryFn: () => getHistoryWeight(user.id),
  })

  const historyWeightTreatment = useMemo(() => {
    return historyWeightQuery.data?.map(({ weight, recordedAt }) => ({
      value: weight,
      label: dayjs(recordedAt).format('DD/MM'),
    })) as lineDataItem[]
  }, [historyWeightQuery.data])

  return {
    current: weightQuery.data.current,
    heaviest: weightQuery.data.heaviest,
    lightest: weightQuery.data.lightest,
    history: historyWeightTreatment,
    isLoading: weightQuery.isLoading || historyWeightQuery.isLoading,
  }
}
