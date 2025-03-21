import * as React from 'react'
import { Platform } from 'react-native'

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import * as SwitchPrimitives from '@rn-primitives/switch'

import { useColorScheme } from '@/hooks'
import { cn } from '@/utils'

const RGB_COLORS = {
  light: {
    primary: 'rgb(24, 24, 27)',
    input: 'rgb(228, 228, 231)',
  },
  dark: {
    primary: 'rgb(250, 250, 250)',
    input: 'rgb(39, 39, 42)',
  },
} as const

const SwitchNative = React.forwardRef<SwitchPrimitives.RootRef, SwitchPrimitives.RootProps>(
  ({ className, ...props }, ref) => {
    const { colorScheme } = useColorScheme()
    const translateX = useDerivedValue(() => (props.checked ? 18 : 0))
    const animatedRootStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          translateX.value,
          [0, 18],
          [RGB_COLORS[colorScheme].input, RGB_COLORS[colorScheme].primary],
        ),
      }
    })
    const animatedThumbStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
    }))
    return (
      <Animated.View
        testID="switch"
        style={animatedRootStyle}
        className={cn('h-8 w-[46px] rounded-full', props.disabled && 'opacity-50')}
      >
        <SwitchPrimitives.Root
          className={cn(
            'flex-row h-8 w-[46px] shrink-0 items-center rounded-full border-2 border-transparent',
            props.checked ? 'bg-primary' : 'bg-input',
            className,
          )}
          {...props}
          ref={ref}
        >
          <Animated.View style={animatedThumbStyle}>
            <SwitchPrimitives.Thumb
              className={'h-7 w-7 rounded-full bg-background shadow-md shadow-foreground/25 ring-0'}
            />
          </Animated.View>
        </SwitchPrimitives.Root>
      </Animated.View>
    )
  },
)
SwitchNative.displayName = 'SwitchNative'

const Switch = Platform.select({
  default: SwitchNative,
})

export { Switch }
