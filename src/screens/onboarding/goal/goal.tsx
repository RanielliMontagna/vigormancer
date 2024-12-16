import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { GoalEnum, OnboardingSchema } from '../onboarding.schema'
import { useOnboardingContext } from '../onboarding.context'

import { Button, H2, P, Text } from '@/components'
import { cn } from '@/utils'

interface GoalCheckboxProps {
  goal: GoalEnum
  selectedGoal: GoalEnum
  setGoal: (goal: GoalEnum) => void
}

function GoalCheckbox({ goal, selectedGoal, setGoal }: GoalCheckboxProps) {
  return (
    <TouchableOpacity
      className={cn(
        'border border-stone-400 rounded-xl p-4 flex-row justify-between transition-all',
        selectedGoal === goal && 'border border-gray-800',
      )}
      onPress={() => setGoal(goal)}
    >
      <View className="flex-row items-center">
        <Text className={cn(selectedGoal === goal && 'font-bold')}>
          {GoalEnum[goal].replace(/([A-Z])/g, ' $1').trim()}
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
  const { prevStep, nextStep } = useOnboardingContext()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const goals = [
    { id: GoalEnum.LoseWeight, label: 'Lose Weight' },
    { id: GoalEnum.BuildMuscle, label: 'Build Muscle' },
    { id: GoalEnum.ImproveStamina, label: 'Improve Stamina' },
    { id: GoalEnum.ImproveHealth, label: 'Improve Health' },
    { id: GoalEnum.StayActive, label: 'Stay Active' },
  ]

  const selectedGoal = watch('goal')

  function setGoal(goal: GoalEnum) {
    setValue('goal', goal)
  }

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background">
      <View className="flex flex-col flex-1 gap-4">
        <View>
          <TouchableOpacity
            onPress={prevStep}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <H2>What's Your Fitness Goal?</H2>
          <P className="text-muted-foreground">
            Define your principal purpose. Let's make it happen.
          </P>
        </View>
        <View className="flex flex-col gap-4">
          {goals.map((goal) => (
            <GoalCheckbox
              key={goal.id}
              goal={goal.id}
              selectedGoal={selectedGoal}
              setGoal={setGoal}
            />
          ))}
        </View>
      </View>
      <View>
        <Button size="lg" onPress={nextStep} disabled={!selectedGoal}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
