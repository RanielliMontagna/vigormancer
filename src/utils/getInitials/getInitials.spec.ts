import { getInitials } from './getInitials'

describe('getInitials', () => {
  it('should return the initials of a name', () => {
    expect(getInitials('John Doe')).toBe('JD')
  })

  it('should return the first letter if there is only one word', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('should return an empty string if the input is empty', () => {
    expect(getInitials('')).toBe('')
  })
})
