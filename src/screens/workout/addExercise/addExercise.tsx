import { Image, Pressable, View } from 'react-native'

import { useAddExercise } from './useAddExercise'
import { BackButton, Form, H2, P, SearchField, Separator, Text } from '@/components'
import { useColorScheme } from '@/hooks'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { FlashList } from '@shopify/flash-list'
import { Asset } from 'expo-asset'
import { exerciseImageMap } from './exerciseImageMap'

export function AddExercise() {
  const { isDarkColorScheme } = useColorScheme()
  const { methods, t, data, isLoading, refetch, handleSelectExercise } = useAddExercise()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-8 bg-background gap-6" testID="add-exercise">
        <BackButton />
        <View>
          <H2>{t('workout.addExercise.title')}</H2>
          <P className="text-sm text-muted-foreground">{t('workout.addExercise.subtitle')}</P>
        </View>
        <View>
          <SearchField
            name="search"
            control={methods.control}
            label={t('workout.addExercise.search')}
            placeholder={t('workout.addExercise.searchPlaceholder')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlashList
            data={data}
            refreshing={isLoading}
            onRefresh={refetch}
            estimatedItemSize={140}
            renderItem={({ item, index }) => {
              let imageUri: string | undefined

              if (item.image) {
                const asset = Asset.fromModule(exerciseImageMap[`${item.name}.jpg`])
                imageUri = asset.uri
              }

              const equipments = t(`${item.name}.equipment`) !== `${item.name}.equipment`

              return (
                <Pressable
                  key={index}
                  style={{ height: 140 }}
                  className="bg-card p-2 gap-2 rounded-lg flex-row items-center"
                  onPress={() => handleSelectExercise(item)}
                >
                  <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                  <View className="flex-1 gap-2">
                    <View>
                      <Text>{t(`${item.name}.title`)}</Text>
                      <Text className="text-xs text-muted-foreground flex-wrap flex-shrink">
                        {t(`${item.name}.description`)}
                      </Text>
                    </View>
                    <View className="gap-1">
                      <View className="flex-row gap-1 items-center">
                        <FontAwesome6
                          name="layer-group"
                          size={12}
                          color={isDarkColorScheme ? 'white' : 'black'}
                        />
                        <Text className="text-xs">{t(`categories.${item.category.name}`)}</Text>
                      </View>
                      {equipments && (
                        <View className="flex-row gap-1 items-center">
                          <FontAwesome6
                            name="dumbbell"
                            size={12}
                            color={isDarkColorScheme ? 'white' : 'black'}
                          />
                          <Text className="text-xs" numberOfLines={1} ellipsizeMode="tail">
                            {t(`${item.name}.equipment`)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
              )
            }}
            ItemSeparatorComponent={() => <Separator className="my-1 bg-transparent" />}
          />
        </View>
      </View>
    </Form>
  )
}
