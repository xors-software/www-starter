import dayjs from 'dayjs'

export function isPast
(timestamp: string): boolean {
  const now = dayjs()
  const endTime = dayjs.unix(parseInt(timestamp))
  return now.isAfter(endTime)
}