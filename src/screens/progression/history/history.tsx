import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { P } from '@/components'

export function History() {
  const { t } = useTranslation()

  return (
    <View>
      <View>
        <P>{t('progression.history.title')}</P>
      </View>
    </View>
  )
}
