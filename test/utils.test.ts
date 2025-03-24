import { describe, expect, it } from 'vitest'
import { formatDate, formatDuration, prettyBytes } from '../src/utils'

describe('formatDate', () => {
  it('should convert date-time string to human-readable format', () => {
    expect(formatDate('2025-03-23T22:28:59.0337138Z')).toBe('2025-03-23 22:28:59 UTC')
    expect(formatDate('2025-01-26T06:30:00+01:00')).toBe('2025-01-26 05:30:00 UTC')
  })
})

describe('formatDuration', () => {
  it('should convert a duration to human-readable format', () => {
    expect(formatDuration('00:00:49.6596191')).toBe('49 seconds')
    expect(formatDuration('00:01:00.0000000')).toBe('1 minute')
    expect(formatDuration('00:02:00.0000000')).toBe('2 minutes')
    expect(formatDuration('00:01:30.0000000')).toBe('1 minute 30 seconds')
    expect(formatDuration('01:15:30.8948789')).toBe('1 hour 15 minutes 30 seconds')
    expect(formatDuration('04:15:30.8948789')).toBe('4 hours 15 minutes 30 seconds')
  })
})

describe('prettyBytes', () => {
  it('should convert bytes to human-readable format', () => {
    expect(prettyBytes(1024)).toBe('1 KB')
    expect(prettyBytes(7714963409)).toBe('7.19 GB')
    expect(prettyBytes(0)).toBe('0 B')
    expect(prettyBytes(1024 * 1024)).toBe('1 MB')
    expect(prettyBytes(1024 * 1024 * 1024)).toBe('1 GB')
    expect(prettyBytes(1024 * 1024 * 1024 * 1024)).toBe('1 TB')
  })
})
