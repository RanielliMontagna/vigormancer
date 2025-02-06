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
  Text,
} from '@/components'

import { TouchableOpacity } from 'react-native'

interface DeleteExerciseCardProps {
  exerciseName: string
  handleRemoveExercise: () => void
}

export function DeleteExerciseCard({
  exerciseName,
  handleRemoveExercise,
}: DeleteExerciseCardProps) {
  const { t } = useTranslation()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TouchableOpacity
          activeOpacity={0.8}
          className="justify-center items-center h-full w-20 rounded-r-lg bg-red-500"
        >
          <FontAwesome6 name="trash" size={24} color="white" />
        </TouchableOpacity>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('workout.workoutDetails.exerciseCard.removeExerciseTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('workout.workoutDetails.exerciseCard.removeExerciseDescription', {
              name: t(`${exerciseName}.title`),
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>{t('workout.workoutDetails.exerciseCard.cancel')}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleRemoveExercise}>
            <Text>{t('workout.workoutDetails.exerciseCard.removeExercise')}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
