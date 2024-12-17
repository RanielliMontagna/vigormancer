import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { OnboardingSchema, SexEnum } from '../onboarding.schema'

import { BackButton, Button, H2, P, Text } from '@/components'
import { cn } from '@/utils'
import { useColorScheme } from '@/hooks'

export function Sex() {
  const { t } = useTranslation()

  const { watch, setValue } = useFormContext<OnboardingSchema>()
  const { isDarkColorScheme } = useColorScheme()

  const selectedSex = watch('sex')

  function handleSelectSex(sex: SexEnum) {
    setValue('sex', sex)
  }

  const genderOptions = [
    { enum: SexEnum.Male, icon: 'mars' },
    { enum: SexEnum.Female, icon: 'venus' },
  ]

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.sex.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.sex.subtitle')}</P>
        </View>
        <View className="gap-4">
          {genderOptions.map(({ enum: genderEnum, icon }) => (
            <TouchableOpacity
              key={genderEnum}
              className={cn(
                'border border-stone-400 rounded-xl p-4 flex-row justify-between transition-all',
              )}
              onPress={() => handleSelectSex(genderEnum)}
            >
              <View className="flex flex-row gap-4 h-8 items-center">
                <FontAwesome6 name={icon} size={24} color={isDarkColorScheme ? 'white' : 'black'} />
                <Text className={cn(selectedSex === genderEnum && 'font-bold')}>
                  {t(`onboarding.sex.${SexEnum[genderEnum].toLowerCase()}`)}
                </Text>
              </View>

              <View className={cn('w-8 h-8 rounded-xl justify-center items-center transition-all')}>
                {selectedSex === genderEnum ? (
                  <FontAwesome6 name="check-circle" size={20} color={colors.green[500]} />
                ) : (
                  <FontAwesome6 name="circle" size={20} color={colors.stone[400]} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Button size="lg" onPress={() => router.push('onboarding/age')} disabled={!selectedSex}>
          <Text>{t('onboarding.sex.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
