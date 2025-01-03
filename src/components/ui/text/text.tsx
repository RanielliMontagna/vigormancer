import * as Slot from '@rn-primitives/slot'
import { SlottableTextProps, TextRef } from '@rn-primitives/types'
import * as React from 'react'
import { Text as RNText } from 'react-native'
import { cn } from '@/utils'

const TextClassContext = React.createContext<string | undefined>(undefined)

type TextProps = SlottableTextProps & {
  bold?: boolean
}

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, asChild = false, bold, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext)
    const Component = asChild ? Slot.Text : RNText
    return (
      <Component
        className={cn(
          'font-lexend-regular text-base text-foreground web:select-text',
          bold && 'font-lexend-bold',
          textClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'

export { Text, TextClassContext }
