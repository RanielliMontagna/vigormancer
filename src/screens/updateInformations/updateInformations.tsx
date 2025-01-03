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
            control={methods.control}
            name="username"
            label={t('updateInformations.username')}
            placeholder={t('updateInformations.usernamePlaceholder')}
            required
          />
          <TextField
            control={methods.control}
            name="fullName"
            label={t('updateInformations.fullName')}
            placeholder={t('updateInformations.fullNamePlaceholder')}
          />
          <TextField
            control={methods.control}
            name="email"
            label={t('updateInformations.email')}
            placeholder={t('updateInformations.emailPlaceholder')}
            required
            editable={false}
            helperText={t('updateInformations.emailHelperText')}
          />
          <TextField
            control={methods.control}
            name="weight"
            label={t('updateInformations.weight')}
            type="number"
            required
            endAdornment={<Text className="text-sm">kg</Text>}
          />
          <TextField
            control={methods.control}
            name="height"
            label={t('updateInformations.height')}
            type="number"
            required
            endAdornment={<Text className="text-sm">cm</Text>}
          />
        </View>
        <View className="gap-2">
          <Button onPress={handleSubmit} size="lg" className="gap-2">
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
