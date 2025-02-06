import React, { FC } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { capitalize } from '@/utils'

type Option = {
  value: string
  label: string
  group?: string
  image?: string
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

  const optionsGrouped = options.reduce(
    (acc, option) => {
      if (option.group) {
        if (!acc[option.group]) {
          acc[option.group] = []
        }

        acc[option.group].push(option)
      }

      return acc
    },
    {} as Record<string, Option[]>,
  )

  const optionsUnGrouped = options.filter((option) => !option.group)

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
                <ScrollView className="max-h-80 flex-col gap-1">
                  {optionsUnGrouped.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      image={option.image}
                    />
                  ))}
                  {Object.entries(optionsGrouped).map(([group, options]) => (
                    <SelectGroup key={group} className="gap-1">
                      <SelectLabel>{capitalize(group)}</SelectLabel>
                      {options.map((option) => (
                        <SelectItem
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          image={option.image}
                        />
                      ))}
                    </SelectGroup>
                  ))}
                </ScrollView>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{helperText}</FormMessage>
        </FormItem>
      )}
    />
  )
}
