import { LineChart, lineDataItem } from 'react-native-gifted-charts'
import { useTranslation } from 'react-i18next'
import { Dimensions, View } from 'react-native'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, H2, P, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import { useProgressionContext } from '../progression.context'

export function Weight() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const { handleOpenWeightBottomSheet } = useProgressionContext()

  const data = [
    { value: 75, label: '01/05' },
    { value: 74, label: '05/06' },
    { value: 70, label: '12/06' },
    { value: 64, label: '22/06' },
    { value: 67, label: '29/07' },
    { value: 63, label: '04/10' },
  ] as lineDataItem[]

  const minValueOfData = data?.reduce(
    (acc, curr) => (curr.value < acc ? curr.value : acc),
    data[0].value,
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
              <H2>63</H2>
              <P className="color-muted-foreground">kg</P>
            </View>
          </View>
          <View className="justify-center">
            <View className="flex-row justify-between items-baseline gap-4">
              <P className="text-sm font-lexend-light">{t('progression.weight.heaviest')}</P>
              <View className="flex-row items-baseline gap-1">
                <Text bold>75</Text>
                <P className="text-xs">kg</P>
              </View>
            </View>
            <View className="flex-row justify-between items-baseline gap-4">
              <P className="text-sm font-lexend-light">{t('progression.weight.lightest')}</P>
              <View className="flex-row items-baseline gap-1">
                <Text bold>63</Text>
                <P className="text-xs">kg</P>
              </View>
            </View>
          </View>
        </View>
        <LineChart
          areaChart
          isAnimated
          curved
          data={data}
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
          stepValue={5}
          height={Dimensions.get('window').height / 5}
        />
      </View>
    </View>
  )
}
