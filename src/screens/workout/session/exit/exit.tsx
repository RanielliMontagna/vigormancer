import { useTranslation } from 'react-i18next'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  BackButton,
  Text,
} from '@/components'
import { useExit } from './useExit'

export function Exit() {
  const { t } = useTranslation()

  const { isDialogVisible, handleCancel, handleExit } = useExit()

  return (
    <AlertDialog open={isDialogVisible}>
      <AlertDialogTrigger asChild>
        <BackButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{t('workout.session.exit.title')}</AlertDialogTitle>
        <AlertDialogDescription>{t('workout.session.exit.description')}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={handleCancel}>
            <Text>{t('workout.session.exit.cancel')}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleExit}>
            <Text>{t('workout.session.exit.exit')}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
