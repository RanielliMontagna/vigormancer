import React, { FC, useRef } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'
import { Input, InputProps } from '../../ui/input/input'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { TouchableOpacity, View } from 'react-native'
import { useColorScheme } from '@/hooks'

interface QuantityFieldProps extends InputProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  helperText?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  min?: number
  max?: number
}

export const QuantityField: FC<QuantityFieldProps> = ({
  name,
  label,
  control,
  placeholder,
  defaultValue,
  required = false,
  helperText,
  startAdornment,
  endAdornment,
  min = 0,
  max = 999999,
  ...rest
}) => {
  const { isDarkColorScheme } = useColorScheme()
  const regexOnlyNumbers = (text: string) => text?.replace(/[^0-9]/g, '')

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startChanging = (changeFn: () => void) => {
    changeFn()
    stopChanging()
    intervalRef.current = setInterval(changeFn, 200)
  }

  const stopChanging = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel required={required} htmlFor={name}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <View className="flex flex-row items-center">
                <TouchableOpacity
                  testID="decrement-button"
                  className="w-12 h-12 justify-center items-center pr-[2px] border-l border-border rounded-l-xl bg-card"
                  onPressIn={() => startChanging(() => (value > min ? onChange(value - 1) : null))}
                  onPressOut={stopChanging}
                >
                  <FontAwesome6 name="minus" color={isDarkColorScheme ? 'white' : 'black'} />
                </TouchableOpacity>
                <Input
                  testID="quantity-field"
                  defaultValue={defaultValue}
                  id={name}
                  placeholder={placeholder}
                  value={regexOnlyNumbers(String(value))}
                  keyboardType="numeric"
                  className="flex-1"
                  onChange={(event) => {
                    const { text } = event.nativeEvent
                    const numericText = regexOnlyNumbers(text)
                    onChange(numericText)
                  }}
                  startAdornment={startAdornment}
                  endAdornment={endAdornment}
                  {...rest}
                />
                <TouchableOpacity
                  testID="increment-button"
                  className="w-12 h-12 justify-center items-center pl-[2px] border-r border-border rounded-r-xl bg-card"
                  onPressIn={() => startChanging(() => (value < max ? onChange(value + 1) : null))}
                  onPressOut={stopChanging}
                >
                  <FontAwesome6 name="plus" color={isDarkColorScheme ? 'white' : 'black'} />
                </TouchableOpacity>
              </View>
            </FormControl>
            <FormMessage>{helperText}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
