import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { H2, P, Text } from '@/components'
import { useTranslation } from 'react-i18next'
import { UserInformations } from './userInformations/userInformations'
import { General } from './general/general'
import { Preferences } from './preferences/preferences'

import { getDatabaseVersion } from '@/db'
import packageJson from '../../../package.json'
import { capitalize } from '@/utils'

export function Profile() {
  const { t } = useTranslation()

  const [dbVersion, setDbVersion] = useState<number | null>(null)

  useEffect(() => {
    const fetchDbVersion = async () => {
      const version = await getDatabaseVersion()
      setDbVersion(version)
    }

    fetchDbVersion()
  }, [])

  return (
    <ScrollView className="h-screen bg-background" testID="profile">
      <View className="gap-4 p-8">
        <View className="flex flex-col">
          <H2>{t('profile.title')}</H2>
          <P className="text-muted-foreground text-sm">{t('profile.subtitle')}</P>
        </View>
        <UserInformations />
        <General />
        <Preferences />
      </View>
      <View className="px-8">
        <View className="justify-center flex-row gap-1">
          <Text className="text-xs text-muted-foreground">{t('profile.footer.appVersion')}</Text>
          <Text className="text-xs text-muted-foreground">
            {packageJson.version} ({capitalize(process.env.NODE_ENV)})
          </Text>
        </View>
        <View className="justify-center flex-row gap-1">
          <Text className="text-xs text-muted-foreground">{t('profile.footer.dbVersion')}</Text>
          <Text className="text-xs text-muted-foreground">{dbVersion}</Text>
        </View>
      </View>
    </ScrollView>
  )
}
