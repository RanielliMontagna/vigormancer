import { Image } from 'react-native'

import WithNameBlack from '@/assets/images/logo/with-name-black.png'
import WithNameWhite from '@/assets/images/logo/with-name-white.png'
import WithNameBlackHorizontal from '@/assets/images/logo/with-name-black-horizontal.png'
import WithNameWhiteHorizontal from '@/assets/images/logo/with-name-white-horizontal.png'

import { useColorScheme } from '@/hooks'
import { cn } from '@/utils'

interface LogoProps {
  /**
   * The orientation of the logo.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}

export function Logo({ orientation = 'vertical' }: LogoProps) {
  const { isDarkColorScheme } = useColorScheme()

  if (orientation === 'vertical') {
    return (
      <Image
        source={isDarkColorScheme ? WithNameWhite : WithNameBlack}
        className={cn('w-48 h-28')}
      />
    )
  }

  return (
    <Image
      source={isDarkColorScheme ? WithNameWhiteHorizontal : WithNameBlackHorizontal}
      className={cn('w-56 h-20')}
    />
  )
}
