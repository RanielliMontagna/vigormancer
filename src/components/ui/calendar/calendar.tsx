import { StyleSheet, View } from 'react-native'
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars'

import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

export function Calendar(props: CalendarProps) {
  const { isDarkColorScheme } = useColorScheme()

  const textColor = isDarkColorScheme ? colors.white : colors.black

  return (
    <View>
      <RNCalendar
        style={styles.calendar}
        headerStyle={styles.header}
        theme={{
          arrowColor: colors.gray[400],
          monthTextColor: textColor,
          calendarBackground: colors.transparent,
          dayTextColor: textColor,
          todayTextColor: colors.indigo[500],
          selectedDayTextColor: colors.white,
          selectedDayBackgroundColor: colors.indigo[600],
          ...props?.theme,
        }}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 8,
  },
})
