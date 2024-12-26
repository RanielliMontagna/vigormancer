import { ScrollView, View } from 'react-native'

import { H2, P } from '@/components'
import { useTranslation } from 'react-i18next'
import { UserInformations } from './userInformations/userInformations'
import { General } from './general/general'
import { Preferences } from './preferences/preferences'

export function Profile() {
  const { t } = useTranslation()

  return (
    <ScrollView className="h-screen p-8 bg-background">
      <View className="gap-4">
        <View className="flex flex-col">
          <H2>{t('profile.title')}</H2>
          <P className="text-muted-foreground text-sm">{t('profile.subtitle')}</P>
        </View>
        <UserInformations />
        <General />
        <Preferences />
      </View>
    </ScrollView>
  )
}
