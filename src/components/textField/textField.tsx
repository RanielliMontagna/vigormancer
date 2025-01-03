import React, { FC } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form/form'
import { Input, InputProps } from '../ui/input/input'

interface TextFieldProps extends InputProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  defaultValue?: string
  required?: boolean
  helperText?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  control,
  placeholder,
  defaultValue,
  type = 'text',
  required = false,
  helperText,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          {label && (
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              defaultValue={defaultValue}
              id={name}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              {...rest}
            />
          </FormControl>
          <FormMessage>{helperText}</FormMessage>
        </FormItem>
      )}
    />
  )
}
