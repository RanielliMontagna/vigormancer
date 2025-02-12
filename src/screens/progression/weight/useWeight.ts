import { getHistoryWeight } from '@/db/controllers/user/get-history-weight'
import { getLastestWeight } from '@/db/controllers/user/get-weight'
import { useUser } from '@clerk/clerk-expo'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { lineDataItem } from 'react-native-gifted-charts'

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
