import { TouchableOpacity, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

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
  const { isDarkColorScheme } = useColorScheme()
  const { methods, t, handleSubmit } = useChangePassword()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-8 bg-background gap-6" testID="change-password">
        <BackButton />
        <View>
          <H2>{t('changePassword.title')}</H2>
          <P className="text-sm text-muted-foreground">{t('changePassword.subtitle')}</P>
        </View>
        <View className="gap-4 flex-1">
          <TextField
            control={methods.control}
            name="currentPassword"
            label={t('changePassword.currentPassword')}
            placeholder={t('changePassword.currentPasswordPlaceholder')}
            type="password"
            required
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
            label={t('changePassword.newPassword')}
            placeholder={t('changePassword.newPasswordPlaceholder')}
            type="password"
            required
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
            label={t('changePassword.confirmPassword')}
            placeholder={t('changePassword.confirmPasswordPlaceholder')}
            type="password"
            required
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
            <FontAwesome6
              name="circle-check"
              solid
              size={16}
              color={isDarkColorScheme ? 'black' : 'white'}
            />
            <Text>{t('changePassword.submit')}</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
