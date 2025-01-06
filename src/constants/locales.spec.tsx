import { localesEn, localesPt } from './locales'

describe('locales', () => {
  it('should return the correct month names for en', () => {
    const result = localesEn()

    expect(result.monthNames).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ])
  })

  it('should return the correct month names for pt', () => {
    const result = localesPt()

    expect(result.monthNames).toEqual([
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ])
  })

  it('should return the correct day names for en', () => {
    const result = localesEn()

    expect(result.dayNames).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
  })

  it('should return the correct day names for pt', () => {
    const result = localesPt()

    expect(result.dayNames).toEqual([
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ])
  })

  it('should return the correct day names short for en', () => {
    const result = localesEn()

    expect(result.dayNamesShort).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
  })

  it('should return the correct day names short for pt', () => {
    const result = localesPt()

    expect(result.dayNamesShort).toEqual(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'])
  })
})
