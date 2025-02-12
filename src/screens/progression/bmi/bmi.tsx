import { Dimensions, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { PieChart } from 'react-native-gifted-charts'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, H1, H3, H4, P, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

import { useBmi } from './useBmi'
import { useProgressionContext } from '../progression.context'
import React from 'react'

export function Bmi() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  const { bmi, height, pieData, bmiLevelValues } = useBmi()
  const { handleOpenBmiBottomSheet } = useProgressionContext()

  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="flex-1">{t('progression.bmi.title')}</Text>
        <Button className="gap-2" size="sm" onPress={handleOpenBmiBottomSheet}>
          <FontAwesome6 name="edit" size={16} color={isDarkColorScheme ? 'black' : 'white'} />
          <Text>{t('progression.bmi.action')}</Text>
        </Button>
      </View>
      <View className="flex-column bg-card rounded-xl items-center justify-center gap-4 p-8">
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          innerCircleColor={isDarkColorScheme ? colors.gray[900] : colors.gray[50]}
          radius={Dimensions.get('window').width / 5}
          innerRadius={Dimensions.get('window').width / 5 - 15}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <H1>{bmi.toFixed(2)}</H1>
                <P className="text-muted-foreground">{t('progression.bmi.title')}</P>
              </View>
            )
          }}
        />
        <View>
          <H3>{bmiLevelValues.title}</H3>
          <P className="text-sm">{bmiLevelValues.description}</P>
          <View className="border-t border-border my-4" />
          <View className="flex-row justify-between items-center">
            <P className="text-sm text-muted-foreground">{t('progression.bmi.height')}</P>
            <View className="flex-row gap-1 items-baseline">
              <H4>{height}</H4>
              <P className="text-sm text-muted-foreground">cm</P>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
