import * as React from 'react'
import { TextInput, View, type TextInputProps } from 'react-native'
import { cn } from '@/utils'
import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'flex flex-row rounded-md border border-border bg-gray-100 items-center',
  {
    variants: {
      size: {
        md: 'h-12 px-2',
        lg: 'h-14 px-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const adornmentVariants = cva('flex items-center justify-center rounded-md', {
  variants: {
    size: {
      md: 'h-4',
      lg: 'h-6',
    },
    startAdornment: { true: 'ml-2' },
    endAdornment: { true: 'mr-2' },
  },
})

export interface InputProps extends TextInputProps {
  /**
   * The start adornment of the input
   * @default undefined
   */
  startAdornment?: React.ReactNode

  /**
   * The end adornment of the input
   * @default undefined
   */
  endAdornment?: React.ReactNode

  /**
   * The size of the input
   * @default 'md'
   */
  size?: 'md' | 'lg'
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, startAdornment, endAdornment, size, ...props }, ref) => {
    return (
      <View className={cn(inputVariants({ size }), className)}>
        {startAdornment && (
          <View className={cn(adornmentVariants({ size, startAdornment: true }))}>
            {startAdornment}
          </View>
        )}
        <TextInput
          ref={ref}
          className={cn(
            'flex-1 h-full placeholder:color-slate-500 web:outline-none',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {endAdornment && (
          <View className={cn(adornmentVariants({ size, endAdornment: true }))}>
            {endAdornment}
          </View>
        )}
      </View>
    )
  },
)

Input.displayName = 'Input'

export { Input }
