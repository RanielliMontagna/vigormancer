import { View } from 'react-native'
import { useForgotPasswordContext } from '../forgotPassword.context'
import { Button, H2, P, Text } from '@/components'

import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/MaterialCommunityIcons'

export function PasswordChanged() {
  const { nextStep } = useForgotPasswordContext()

  return (
    <View className="flex flex-1 justify-center p-4 bg-background gap-10">
      <View className="flex justify-center items-center text-center">
        <FontAwesome6 name="check-decagram" size={100} color={colors.green[400]} />
      </View>
      <View className="gap-1">
        <H2 className="text-center">Password Changed!</H2>
        <P className="text-center text-muted-foreground">
          Your password has been changed successfully.
        </P>
      </View>
      <View>
        <Button size="lg" onPress={nextStep}>
          <Text>Back to login</Text>
        </Button>
      </View>
    </View>
  )
}
