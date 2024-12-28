import { Image, View } from 'react-native'

import LogoBlack from '@/assets/images/logo/black.png'
import LogoWhite from '@/assets/images/logo/white.png'

import { Text } from '../ui/text'
import { useColorScheme } from '@/hooks'
import { cn } from '@/utils'

interface LogoProps {
  /**
   * The orientation of the logo.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'
}

export function Logo({ orientation = 'vertical' }: LogoProps) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View
      className={cn('flex flex-column items-center', orientation === 'horizontal' && 'flex-row')}
    >
      <Image
        source={isDarkColorScheme ? LogoWhite : LogoBlack}
        className={cn('h-12 w-14', orientation === 'vertical' && 'h-20 w-20')}
      />
      <View className="flex flex-row justify-center items-center">
        <Text bold className="text-3xl">
          Vigor
        </Text>
        <Text className="text-3xl">mancer</Text>
      </View>
    </View>
  )
}
