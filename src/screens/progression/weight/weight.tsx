import { LineChart } from 'react-native-gifted-charts'
import { useTranslation } from 'react-i18next'
import { Dimensions, View } from 'react-native'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, H2, P, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import { useProgressionContext } from '../progression.context'
import { useWeight } from './useWeight'

export function Weight() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const { handleOpenWeightBottomSheet } = useProgressionContext()

  const { current, heaviest, lightest, history, isLoading } = useWeight()

  const minValueOfData = history?.reduce(
    (acc, curr) => (curr.value < acc ? curr.value : acc),
    history[0].value,
  )

  const roundedMinValueOfData = Math.floor(minValueOfData / 10) * 10

  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="flex-1">{t('progression.weight.title')}</Text>
        <Button className="gap-2" size="sm" onPress={handleOpenWeightBottomSheet}>
          <FontAwesome6 name="add" solid size={16} color={isDarkColorScheme ? 'black' : 'white'} />
          <Text>{t('progression.weight.action')}</Text>
        </Button>
      </View>
      <View className="flex-column bg-card rounded-xl items-center justify-center gap-4 p-8">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <P className="text-sm font-lexend-light">{t('progression.weight.current')}</P>
            <View className="flex-row items-baseline gap-1">
              <H2>{current}</H2>
              <P className="color-muted-foreground">kg</P>
            </View>
          </View>
          <View className="justify-center">
            <View className="flex-row justify-between items-baseline gap-4">
              <P className="text-sm font-lexend-light">{t('progression.weight.heaviest')}</P>
              <View className="flex-row items-baseline gap-1">
                <Text bold>{heaviest}</Text>
                <P className="text-xs">kg</P>
              </View>
            </View>
            <View className="flex-row justify-between items-baseline gap-4">
              <P className="text-sm font-lexend-light">{t('progression.weight.lightest')}</P>
              <View className="flex-row items-baseline gap-1">
                <Text bold>{lightest}</Text>
                <P className="text-xs">kg</P>
              </View>
            </View>
          </View>
        </View>
        {!isLoading && (
          <LineChart
            areaChart
            isAnimated
            curved
            data={history}
            width={Dimensions.get('window').width / 1.75}
            endSpacing={8}
            noOfSections={5}
            color1={colors.indigo[400]}
            dataPointsColor1={colors.indigo[500]}
            dataPointsRadius1={4}
            startFillColor1={colors.indigo[300]}
            endFillColor1={colors.indigo[200]}
            startOpacity={0.9}
            endOpacity={0.2}
            yAxisOffset={roundedMinValueOfData}
            yAxisLabelSuffix="kg"
            yAxisColor={colors.gray[400]}
            yAxisTextStyle={{
              fontSize: 12,
              color: isDarkColorScheme ? 'white' : 'black',
            }}
            xAxisLabelTextStyle={{
              fontSize: 12,
              color: isDarkColorScheme ? 'white' : 'black',
            }}
            stepValue={2}
            height={Dimensions.get('window').height / 5}
          />
        )}
      </View>
    </View>
  )
}
