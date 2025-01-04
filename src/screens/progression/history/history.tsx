import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Calendar, P } from '@/components'

export function History() {
  const { t } = useTranslation()

  const [markedDates] = useState([
    '2024-12-27',
    '2024-12-28',
    '2024-12-29',
    '2024-12-31',
    '2025-01-01',
    '2025-01-02',
    '2025-01-03',
  ])

  return (
    <View className="gap-4">
      <View>
        <P>{t('progression.history.title')}</P>
      </View>
      <View className="bg-card rounded-xl justify-center p-4">
        <Calendar
          hideExtraDays
          markedDates={
            markedDates.length > 0 &&
            markedDates.reduce((acc, date) => ({ ...acc, [date]: { selected: true } }), {})
          }
        />
      </View>
    </View>
  )
}
