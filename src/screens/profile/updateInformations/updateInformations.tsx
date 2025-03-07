import { View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

import { useUpdateInformations } from './useUpdateInformations'

export function UpdateInformations() {
  const { isDarkColorScheme } = useColorScheme()
  const { methods, t, handleSubmit } = useUpdateInformations()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-8 bg-background gap-6" testID="update-informations">
        <BackButton />
        <View>
          <H2>{t('updateInformations.title')}</H2>
          <P className="text-sm text-muted-foreground">{t('updateInformations.subtitle')}</P>
        </View>
        <View className="gap-4 flex-1">
          <TextField
            testID="username"
            control={methods.control}
            name="username"
            label={t('updateInformations.username')}
            placeholder={t('updateInformations.usernamePlaceholder')}
            required
          />
          <TextField
            testID="fullName"
            control={methods.control}
            name="fullName"
            label={t('updateInformations.fullName')}
            placeholder={t('updateInformations.fullNamePlaceholder')}
          />
          <TextField
            testID="email"
            control={methods.control}
            name="email"
            label={t('updateInformations.email')}
            placeholder={t('updateInformations.emailPlaceholder')}
            required
            editable={false}
            helperText={t('updateInformations.emailHelperText')}
          />
        </View>
        <View className="gap-2">
          <Button onPress={handleSubmit} size="lg" className="gap-2" testID="submit-button">
            <FontAwesome6
              name="circle-check"
              solid
              size={16}
              color={isDarkColorScheme ? 'black' : 'white'}
            />
            <Text>{t('updateInformations.submit')}</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
