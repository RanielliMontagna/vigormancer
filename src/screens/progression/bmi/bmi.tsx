import { Dimensions, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { PieChart } from 'react-native-gifted-charts'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, H1, H3, H4, P, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'
import { useMemo } from 'react'
import { BmiLevels } from './bmi.types'

export function Bmi() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  const bmiLevelValues = useMemo(() => {
    //TODO: Replace with actual BMI value
    const bmiLevel = BmiLevels.Underweight as BmiLevels

    var bmiColor = {
      color: colors.blue[400] as string,
      gradientCenterColor: colors.blue[500] as string,
      backgroundColor: colors.blue[100] as string,
    }

    switch (bmiLevel) {
      case BmiLevels.Underweight:
        bmiColor = {
          color: colors.orange[400],
          gradientCenterColor: colors.orange[500],
          backgroundColor: colors.orange[100],
        }
        break
      case BmiLevels.Overweight:
        bmiColor = {
          color: colors.orange[400],
          gradientCenterColor: colors.orange[500],
          backgroundColor: colors.orange[100],
        }
        break
      case BmiLevels.ObesityI:
        bmiColor = {
          color: colors.red[400],
          gradientCenterColor: colors.red[500],
          backgroundColor: colors.red[100],
        }
        break
      case BmiLevels.ObesityII:
        bmiColor = {
          color: colors.red[500],
          gradientCenterColor: colors.red[600],
          backgroundColor: colors.red[100],
        }
        break
      case BmiLevels.ObesityIII:
        bmiColor = {
          color: colors.red[600],
          gradientCenterColor: colors.red[700],
          backgroundColor: colors.red[100],
        }
        break
      default:
        break
    }

    return {
      title: t(`progression.bmi.levels.${bmiLevel}.title`),
      description: t(`progression.bmi.levels.${bmiLevel}.description`),
      color: bmiColor,
    }
  }, [t])

  const pieData = [
    { value: 20, color: bmiLevelValues.color.backgroundColor },
    {
      value: 80,
      color: bmiLevelValues.color.color,
      gradientCenterColor: bmiLevelValues.color.gradientCenterColor,
      focused: true,
    },
  ]

  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="flex-1">{t('progression.bmi.title')}</Text>
        <Button className="gap-2" size="sm">
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
                <H1>21</H1>
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
              <H4>180</H4>
              <P className="text-sm text-muted-foreground">cm</P>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
