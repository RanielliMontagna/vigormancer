import React from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { H2, P } from '@/components'

import { ProgressionProvider } from './progression.context'

import { Cards } from './cards/cards'
import { History } from './history/history'
import { Weight } from './weight/weight'
import { Bmi } from './bmi/bmi'
import { BmiBottomSheet } from './bmi/bmiBottomSheet/bmiBottomSheet'
import { WeightBottomSheet } from './weight/weightBottomSheet/weightBottomSheet'

function Progression() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <ScrollView className="h-screen bg-background" testID="progression">
        <View className="gap-4 p-8">
          <View className="flex flex-col">
            <H2>{t('progression.title')}</H2>
            <P className="text-muted-foreground text-sm">{t('progression.subtitle')}</P>
          </View>
          <Cards />
          <History />
          <Weight />
          <Bmi />
        </View>
      </ScrollView>
      <BmiBottomSheet />
      <WeightBottomSheet />
    </React.Fragment>
  )
}

function ProgressionWrapper() {
  return (
    <ProgressionProvider>
      <Progression />
    </ProgressionProvider>
  )
}

export { ProgressionWrapper as Progression }
