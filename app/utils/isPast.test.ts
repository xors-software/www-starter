import { describe, it, expect } from 'vitest'
import { isPast } from './isPast' // Adjust the import path as needed
import dayjs from 'dayjs'

describe('isPast', () => {
  it('should return true for a timestamp in the past', () => {
    const pastTimestamp = dayjs().subtract(1, 'day').unix().toString()
    expect(isPast(pastTimestamp)).toBe(true)
  })

  it('should return false for a timestamp in the future', () => {
    const futureTimestamp = dayjs().add(1, 'day').unix().toString()
    expect(isPast(futureTimestamp)).toBe(false)
  })

  it('should handle edge case with current time', () => {
    const currentTimestamp = dayjs().unix().toString()
    expect(isPast(currentTimestamp)).toBe(true)
  })
})
