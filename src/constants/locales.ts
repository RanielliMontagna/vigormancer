import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import 'dayjs/locale/en'
import 'dayjs/locale/pt'

dayjs.extend(localeData)

export const localesEn = () => {
  dayjs.locale('en')

  return {
    monthNames: dayjs.months().map((month) => month.charAt(0).toUpperCase() + month.slice(1)),
    dayNames: dayjs.weekdays().map((day) => day.charAt(0).toUpperCase() + day.slice(1)),
    dayNamesShort: dayjs.weekdaysShort().map((day) => day.charAt(0).toUpperCase() + day.slice(1)),
  }
}

export const localesPt = () => {
  dayjs.locale('pt')

  return {
    monthNames: dayjs.months().map((month) => month.charAt(0).toUpperCase() + month.slice(1)),
    dayNames: dayjs.weekdays().map((day) => day.charAt(0).toUpperCase() + day.slice(1)),
    dayNamesShort: dayjs.weekdaysShort().map((day) => day.charAt(0).toUpperCase() + day.slice(1)),
  }
}
