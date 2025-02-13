import { BmiLevels } from '@/screens/progression/bmi/bmi.types'

interface BmiProps {
  weight: number
  height: number
}

export function calculateBMI({ weight: weightKg, height: heightCm }: BmiProps) {
  // Convert height from centimeters to meters
  const heightM = heightCm / 100

  // Calculate BMI
  const bmi = weightKg / (heightM * heightM)

  // Determine the BMI category
  let category: BmiLevels

  if (bmi < 18.5) {
    category = BmiLevels.Underweight
  } else if (bmi >= 18.5 && bmi < 25) {
    category = BmiLevels.Normal
  } else if (bmi >= 25 && bmi < 30) {
    category = BmiLevels.Overweight
  } else if (bmi >= 30 && bmi < 35) {
    category = BmiLevels.ObesityI
  } else if (bmi >= 35 && bmi < 40) {
    category = BmiLevels.ObesityII
  } else {
    category = BmiLevels.ObesityIII
  }

  // Return the BMI value and category
  return { bmi: +bmi.toFixed(2), category }
}
