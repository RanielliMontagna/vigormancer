import z from 'zod'

export enum SexEnum {
  Male = 1,
  Female = 2,
}

export enum GoalEnum {
  LoseWeight = 1,
  BuildMuscle = 2,
  ImproveStamina = 3,
  ImproveHealth = 4,
  StayActive = 5,
}

export const onboardingSchema = z.object({
  sex: z.nativeEnum(SexEnum),
  age: z
    .number()
    .min(14, 'You must be at least 14 years old')
    .max(100, 'You must be at most 100 years old'),
  weight: z.number().min(1, 'Weight is required'),
  height: z.number().min(1, 'Height is required'),
  goal: z.nativeEnum(GoalEnum),
})

export type OnboardingSchema = z.infer<typeof onboardingSchema>
