import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'

import { useUser } from '@clerk/clerk-expo'
import { BmiLevels } from './bmi.types'
import { useQuery } from '@tanstack/react-query'
import { calculateBMI } from '@/utils/calculateBmi/calculateBmi'
import { getHeight, getLatestWeight } from '@/db'

export function useBmi() {
  const { user } = useUser()
  const { t } = useTranslation()

  const weightQuery = useQuery({ queryKey: ['weight'], queryFn: () => getLatestWeight(user.id) })
  const heightQuery = useQuery({ queryKey: ['height'], queryFn: () => getHeight(user.id) })

  const { bmi, category } = calculateBMI({
    weight: weightQuery.data?.current,
    height: heightQuery.data,
  })

  const bmiLevelValues = useMemo(() => {
    var bmiColor = {
      color: colors.blue[400] as string,
      gradientCenterColor: colors.blue[500] as string,
      backgroundColor: colors.blue[100] as string,
    }

    switch (category) {
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
      title: t(`progression.bmi.levels.${category}.title`),
      description: t(`progression.bmi.levels.${category}.description`),
      color: bmiColor,
    }
  }, [category, t])

  const pieData = [
    { value: 20, color: bmiLevelValues.color.backgroundColor },
    {
      value: 80,
      color: bmiLevelValues.color.color,
      gradientCenterColor: bmiLevelValues.color.gradientCenterColor,
      focused: true,
    },
  ]

  return {
    height: heightQuery.data,
    pieData,
    bmi,
    bmiLevelValues,
  }
}
