import { Image, Pressable, RefreshControl, View } from 'react-native'

import { useAddExercise } from './useAddExercise'
import { BackButton, Form, H2, P, SearchField, Separator, Text } from '@/components'
import { useColorScheme } from '@/hooks'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { FlashList } from '@shopify/flash-list'
import { Asset } from 'expo-asset'
import { exerciseImageMap } from '../../../shared/exerciseImageMap'

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
            testID="search"
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
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
            onRefresh={refetch}
            estimatedItemSize={140}
            renderItem={({ item, index }) => {
              let imageUri: string | undefined

              if (item.image) {
                const asset = Asset.fromModule(exerciseImageMap[`${item.exerciseName}.jpg`])
                imageUri = asset.uri
              }

              const equipments =
                t(`${item.exerciseName}.equipment`) !== `${item.exerciseName}.equipment`

              return (
                <Pressable
                  key={index}
                  style={{ height: 140 }}
                  className="bg-card p-2 gap-2 rounded-lg flex-row items-center"
                  onPress={() => handleSelectExercise(item)}
                  testID={`exercise-${item.id}`}
                >
                  <Image source={{ uri: imageUri }} className="w-32 h-20 rounded-lg" />
                  <View className="flex-1 gap-2">
                    <View>
                      <Text>{t(`${item.exerciseName}.title`)}</Text>
                      <Text className="text-xs text-muted-foreground flex-wrap flex-shrink">
                        {t(`${item.exerciseName}.description`)}
                      </Text>
                    </View>
                    <View className="gap-1">
                      <View className="flex-row gap-1 items-center">
                        <FontAwesome6
                          name="layer-group"
                          size={12}
                          color={isDarkColorScheme ? 'white' : 'black'}
                        />
                        <Text className="text-xs">{t(`categories.${item.categoryName}`)}</Text>
                      </View>
                      {equipments && (
                        <View className="flex-row gap-1 items-center">
                          <FontAwesome6
                            name="dumbbell"
                            size={12}
                            color={isDarkColorScheme ? 'white' : 'black'}
                          />
                          <Text className="text-xs" numberOfLines={1} ellipsizeMode="tail">
                            {t(`${item.exerciseName}.equipment`)}
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
