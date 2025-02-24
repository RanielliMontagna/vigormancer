import { useRouter } from 'expo-router'
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

export function Exit() {
  const { t } = useTranslation()
  const { back } = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <BackButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{t('workout.session.exit.title')}</AlertDialogTitle>
        <AlertDialogDescription>{t('workout.session.exit.description')}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>{t('workout.session.exit.cancel')}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={back}>
            <Text>{t('workout.session.exit.exit')}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
