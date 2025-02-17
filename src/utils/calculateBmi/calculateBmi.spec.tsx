import { BmiLevels } from '@/screens/progression/bmi/bmi.types'
import { calculateBMI } from './calculateBmi'

describe('calculateBmi', () => {
  it('should calculate BMI correctly', () => {
    const weight = 75
    const height = 175
    const expectedBmi = 24.49

    const result = calculateBMI({ weight, height })

    expect(result.bmi).toBe(expectedBmi)
  })

  it('should return Underweight category', () => {
    const expectedCategory = BmiLevels.Underweight
    const weight = 50
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })

  it('should return Normal category', () => {
    const expectedCategory = BmiLevels.Normal
    const weight = 75
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })

  it('should return Overweight category', () => {
    const expectedCategory = BmiLevels.Overweight
    const weight = 90
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })

  it('should return ObesityI category', () => {
    const expectedCategory = BmiLevels.ObesityI
    const weight = 105
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })

  it('should return ObesityII category', () => {
    const expectedCategory = BmiLevels.ObesityII
    const weight = 120
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })

  it('should return ObesityIII category', () => {
    const expectedCategory = BmiLevels.ObesityIII
    const weight = 135
    const height = 175

    const result = calculateBMI({ weight, height })

    expect(result.category).toBe(expectedCategory)
  })
})
