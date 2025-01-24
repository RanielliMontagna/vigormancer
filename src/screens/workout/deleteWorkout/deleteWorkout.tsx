import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Text,
} from '@/components'

import { Workout } from '@/db/repositories/workouts'
import { useColorScheme } from '@/hooks'

interface DeleteWorkoutDialogProps {
  workout: Workout
  handleDeleteWorkout: () => void
}

export function DeleteWorkoutDialog({ workout, handleDeleteWorkout }: DeleteWorkoutDialogProps) {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          startIcon={
            <FontAwesome6 name="trash" size={14} color={isDarkColorScheme ? 'black' : 'white'} />
          }
        >
          <Text>{t('workout.workoutDetails.delete')}</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('workout.deleteWorkout.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('workout.deleteWorkout.description', { name: workout.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>{t('workout.deleteWorkout.cancel')}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleDeleteWorkout}>
            <Text>{t('workout.workoutDetails.delete')}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
