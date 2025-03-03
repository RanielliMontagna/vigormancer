import { View } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { FlashList } from '@shopify/flash-list'

import { getLastSessions } from '@/db'
import { useCustomQuery } from '@/hooks'
import { Separator, Text } from '@/components'
import { SummaryListItem } from './summaryListItem/summaryListItem'
import { useTranslation } from 'react-i18next'

export function DashboardSummary() {
  const { user } = useUser()
  const { t } = useTranslation()

  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ['weeklySession'],
    queryFn: () => getLastSessions(user.id),
  })

  return (
    <View className="h-full bg-background gap-2" testID="dashboard-summary">
      <Text className="text-sm text-muted-foreground">{t('dashboard.summary.title')}</Text>
      <FlashList
        testID="flash-list"
        data={data}
        refreshing={isLoading}
        onRefresh={refetch}
        estimatedItemSize={114}
        renderItem={({ item, index }) => <SummaryListItem {...item} index={index} />}
        ItemSeparatorComponent={() => <Separator className="my-1 bg-transparent" />}
      />
    </View>
  )
}
