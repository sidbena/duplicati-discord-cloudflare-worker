/**
 * Convert date-time string to human-readable format.
 * @example
 * formatDate('2025-03-23T22:28:59.0337138Z') // '2025-03-23 22:28:59'
 * @example
 * formatDate('2025-01-26T06:30:00+01:00') // '2025-01-26 06:30:00'
 */
export function formatDate(dateTime: string): string {
  return new Date(dateTime).toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC'
}

/**
 * Convert a duration to human-readable format.
 * @example
 * formatDuration('00:00:49.6596191') // '49.66 seconds'
 * @example
 * formatDuration('00:01:00.0000000') // '1 minute'
 * @example
 * formatDuration('00:01:30.0000000') // '1 minute 30 seconds'
 * @example
 * formatDuration('01:15:30.8948789') // '1 hour 15 minutes 30 seconds'
 */
export function formatDuration(duration: string): string {
  const [hours, minutes, secondsAndMilliseconds] = duration.split(':')
  const [seconds] = secondsAndMilliseconds.split('.')
  const parts: string[] = []

  if (hours !== '00') {
    parts.push(`${parseInt(hours)} hour${parseInt(hours) > 1 ? 's' : ''}`)
  }
  if (minutes !== '00') {
    parts.push(`${parseInt(minutes)} minute${parseInt(minutes) > 1 ? 's' : ''}`)
  }
  if (seconds !== '00') {
    parts.push(`${parseInt(seconds)} second${parseInt(seconds) > 1 ? 's' : ''}`)
  }

  return parts.join(' ')
}

/**
 * Convert bytes to human-readable format.
 * @example
 * prettyBytes(1024) // '1 KB'
 * @example
 * prettyBytes(7714963409) // '7.19 GB'
 */
export function prettyBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}