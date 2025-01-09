import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'

import { BmiLevels } from './bmi.types'

export function useBmi() {
  const { t } = useTranslation()

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

  return {
    pieData,
    bmiLevelValues,
  }
}
