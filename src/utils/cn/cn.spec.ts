import { cn } from './cn'

describe('cn', () => {
  it('should return a string', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })
})
