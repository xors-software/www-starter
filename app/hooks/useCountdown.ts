'use client'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMemo, useState } from 'react'
import { useInterval } from './useInterval'

dayjs.extend(duration)
dayjs.extend(relativeTime)

interface CountdownProps {
  endTime?: string
  showDays?: boolean
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
}

export function useCountdown({
  endTime,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true
}: CountdownProps) {
  const [now, setNow] = useState(dayjs())

  const isEnded = useMemo(() => {
    if (!endTime) return true

    return now.unix() >= parseInt(endTime)
  }, [endTime, now])

  const countdown = useMemo(() => {
    if (!endTime) return ''

    const endDayjs = dayjs.unix(parseInt(endTime))
    const duration = dayjs.duration(endDayjs.diff(now))

    const days = Math.abs(duration.days())
    const hours = Math.abs(duration.hours())
    const minutes = Math.abs(duration.minutes())
    const seconds = Math.abs(duration.seconds())

    const units = []
    if (showDays && days > 0) units.push(days + 'd')
    if (showHours && (showDays || hours > 0)) units.push(hours + 'h')
    if (showMinutes && (showHours || minutes > 0)) units.push(minutes + 'm')
    if (showSeconds && (showMinutes || seconds > 0)) units.push(seconds + 's')

    return units.join(' ')

  }, [endTime, now, showDays, showHours, showMinutes, showSeconds])

  useInterval(() => {
    if(!isEnded) setNow(dayjs())
  }, 1000)

  return {
    isEnded,
    countdown,
    now,
  }
}
