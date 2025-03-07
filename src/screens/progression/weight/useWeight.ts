import dayjs from 'dayjs'
import { useMemo } from 'react'
import { lineDataItem } from 'react-native-gifted-charts'
import { useUser } from '@clerk/clerk-expo'

import { getHistoryWeight, getLatestWeight } from '@/db'
import { useCustomQuery } from '@/hooks'

export function useWeight() {
  const { user } = useUser()

  const weightQuery = useCustomQuery({
    queryKey: ['weight'],
    queryFn: () => getLatestWeight(user.id),
  })
  const historyWeightQuery = useCustomQuery({
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
    current: weightQuery.data?.current,
    heaviest: weightQuery.data?.heaviest,
    lightest: weightQuery.data?.lightest,
    history: historyWeightTreatment,
    isLoading: weightQuery.isLoading || historyWeightQuery.isLoading,
  }
}
