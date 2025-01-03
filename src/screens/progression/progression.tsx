import { H2, P } from '@/components'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

export function Progression() {
  const { t } = useTranslation()

  return (
    <ScrollView className="h-screen bg-background" testID="progression">
      <View className="gap-4 p-8">
        <View className="flex flex-col">
          <H2>{t('progression.title')}</H2>
          <P className="text-muted-foreground text-sm">{t('progression.subtitle')}</P>
        </View>
      </View>
    </ScrollView>
  )
}
