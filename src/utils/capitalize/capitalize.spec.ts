import { capitalize } from './capitalize'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('should return an empty string if the input is empty', () => {
    expect(capitalize('')).toBe('')
  })
})
