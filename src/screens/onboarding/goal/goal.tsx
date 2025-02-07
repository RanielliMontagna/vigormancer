import { TFunction } from 'i18next'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { GoalEnum } from '../onboarding.schema'
import { useGoal } from './useGoal'

import { BackButton, Button, H2, P, Text } from '@/components'
import { cn } from '@/utils'
import { useTranslation } from 'react-i18next'

interface GoalCheckboxProps {
  goal: GoalEnum
  selectedGoal: GoalEnum
  setGoal: (goal: GoalEnum) => void
  t: TFunction
}

function GoalCheckbox({ goal, selectedGoal, setGoal, t }: GoalCheckboxProps) {
  return (
    <TouchableOpacity
      className={cn(
        'border border-stone-400 rounded-xl p-4 flex-row justify-between transition-all',
        selectedGoal === goal && 'border border-green-500',
      )}
      onPress={() => setGoal(goal)}
    >
      <View className="flex-row items-center">
        <Text bold={selectedGoal === goal}>
          {t(`onboarding.goal.${GoalEnum[goal].toLowerCase()}`)}
        </Text>
      </View>
      <View className={cn('w-6 h-6 rounded-xl justify-center items-center transition-all')}>
        {goal === selectedGoal ? (
          <FontAwesome6 name="check-circle" size={20} color={colors.green[500]} />
        ) : (
          <FontAwesome6 name="circle" size={20} color={colors.stone[400]} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export function Goal() {
  const { t } = useTranslation()
  const { goals, selectedGoal, setGoal, handleSubmitOnboarding } = useGoal()

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background" testID="goal">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.goal.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.goal.subtitle')}</P>
        </View>
        <View className="flex flex-col gap-4">
          {goals.map((goal) => (
            <GoalCheckbox
              key={goal.id}
              goal={goal.id}
              selectedGoal={selectedGoal}
              setGoal={setGoal}
              t={t}
            />
          ))}
        </View>
      </View>
      <View>
        <Button
          size="lg"
          onPress={handleSubmitOnboarding}
          disabled={!selectedGoal}
          testID="goal-button"
        >
          <Text>{t('onboarding.goal.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
