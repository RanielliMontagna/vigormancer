import React, { FC } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Option = {
  value: string
  label: string
}

interface SelectFieldProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  defaultValue?: Option
  required?: boolean
  helperText?: string
  options: Option[]
}

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  control,
  placeholder,
  defaultValue,
  required = false,
  helperText,
  options,
}) => {
  const insets = useSafeAreaInsets()
  const contentInsets = { top: insets.top, bottom: insets.bottom, left: 28, right: 28 }

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
            <Select
              defaultValue={defaultValue}
              value={value}
              onValueChange={(option) => onChange(option)}
            >
              <SelectTrigger>
                <SelectValue
                  className="text-sm font-lexend-regular"
                  placeholder={placeholder || 'Select'}
                  value={value}
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className="w-full">
                {options.map((option) => (
                  <SelectItem key={option.value} label={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{helperText}</FormMessage>
        </FormItem>
      )}
    />
  )
}
