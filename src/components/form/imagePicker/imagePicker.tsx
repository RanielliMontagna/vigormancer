import React, { FC } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'

import * as ExpoImagePicker from 'expo-image-picker'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'
import { Text } from '../../ui/text/text'

import { useColorScheme } from '@/hooks'

interface ImagePickerProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  helperText?: string
}

export const ImagePicker: FC<ImagePickerProps> = ({
  name,
  label,
  control,
  placeholder,
  required = false,
  helperText,
}) => {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })

          if (!result.canceled) {
            onChange(result.assets[0].uri)
          }
        }

        return (
          <FormItem>
            {label && (
              <FormLabel required={required} htmlFor={name}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.7}
                className="flex items-center justify-center w-full h-40 bg-card rounded-lg border border-border"
              >
                {value && (
                  <View className="flex flex-row items-center w-full h-full p-2">
                    <View className="flex-1 flex flex-column items-center gap-2">
                      <FontAwesome6
                        name="image"
                        size={24}
                        color={isDarkColorScheme ? 'white' : 'black'}
                      />
                      <Text>{t('others.changeImage')}</Text>
                    </View>
                    <View className="flex flex-1">
                      <Image source={{ uri: value }} className="w-full h-full rounded-lg" />
                    </View>
                    <View className="absolute top-4 right-4 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                      <FontAwesome6
                        name="trash"
                        size={14}
                        color={colors.white}
                        onPress={() => onChange('')}
                      />
                    </View>
                  </View>
                )}
                {!value && (
                  <>
                    <FontAwesome6
                      name="image"
                      size={24}
                      color={isDarkColorScheme ? 'white' : 'black'}
                    />
                    <Text>{placeholder || t('others.chooseImage')}</Text>
                  </>
                )}
              </TouchableOpacity>
            </FormControl>
            <FormMessage>{helperText}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
