import { View } from 'react-native'
import { Tabs } from 'expo-router'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

export default function PrivateRoutesLayout() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-1 bg-background">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.black,
            height: 60,
            paddingBottom: 5,
            paddingTop: 12,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray[500],
          animation: 'shift',
          sceneStyle: {
            backgroundColor: isDarkColorScheme ? colors.black : colors.white,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="workout"
          options={{
            title: 'Workout',
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="dumbbell" color={color} />,
          }}
        />
        <Tabs.Screen
          name="progression"
          options={{
            title: 'Progression',
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="chart-line" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="user" color={color} />,
          }}
        />
      </Tabs>
    </View>
  )
}
