import { TouchableOpacity, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useChangePassword } from './useChangePassword'

function EyeButton({ onPress, show }: { onPress: () => void; show: boolean }) {
  return (
    <TouchableOpacity onPress={onPress}>
      {show ? (
        <FontAwesome6 name="eye-slash" size={16} color="gray" />
      ) : (
        <FontAwesome6 name="eye" size={16} color="gray" />
      )}
    </TouchableOpacity>
  )
}

export function ChangePassword() {
  const { methods, t, handleSubmit } = useChangePassword()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-4 bg-background gap-6">
        <BackButton />
        <View>
          <H2>{t('changePassword.title')}</H2>
          <P className="text-sm text-muted-foreground">{t('changePassword.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="currentPassword"
            placeholder={t('changePassword.currentPasswordPlaceholder')}
            type="password"
            size="lg"
            secureTextEntry={!methods.watch('showCurrentPassword')}
            endAdornment={
              <EyeButton
                onPress={() =>
                  methods.setValue('showCurrentPassword', !methods.watch('showCurrentPassword'))
                }
                show={methods.watch('showCurrentPassword')}
              />
            }
          />
          <TextField
            control={methods.control}
            name="newPassword"
            placeholder={t('changePassword.newPasswordPlaceholder')}
            type="password"
            size="lg"
            secureTextEntry={!methods.watch('showNewPassword')}
            endAdornment={
              <EyeButton
                onPress={() =>
                  methods.setValue('showNewPassword', !methods.watch('showNewPassword'))
                }
                show={methods.watch('showNewPassword')}
              />
            }
          />
          <TextField
            control={methods.control}
            name="confirmPassword"
            placeholder={t('changePassword.confirmPasswordPlaceholder')}
            type="password"
            size="lg"
            secureTextEntry={!methods.watch('showConfirmPassword')}
            endAdornment={
              <EyeButton
                onPress={() =>
                  methods.setValue('showConfirmPassword', !methods.watch('showConfirmPassword'))
                }
                show={methods.watch('showConfirmPassword')}
              />
            }
          />
        </View>
        <View className="gap-2">
          <Button onPress={handleSubmit} size="lg" className="gap-2">
            <FontAwesome6 name="circle-check" solid size={16} color="white" />
            <Text>{t('changePassword.submit')}</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
