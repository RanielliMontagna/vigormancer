import React, { FC } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'
import { Input, InputProps } from '../../ui/input/input'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface SearchFieldProps extends InputProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  defaultValue?: string
  required?: boolean
  helperText?: string
}

export const SearchField: FC<SearchFieldProps> = ({
  name,
  label,
  control,
  placeholder,
  defaultValue,
  type = 'text',
  required = false,
  helperText,

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
              startAdornment={
                <FontAwesome6
                  name="magnifying-glass"
                  size={14}
                  color="gray"
                  style={{ marginRight: 8 }}
                />
              }
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
