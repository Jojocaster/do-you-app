import { addMinutes, parseISO } from 'date-fns'
import { format } from 'date-fns-tz'

// TODO: double check whern BST starts
const hasDST = (date = new Date()) => {
  const january = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
  const july = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()

  return Math.max(january, july) !== date.getTimezoneOffset()
}

export const getLocalTime = (dateTime: string): Date => {
  const offset = hasDST() ? '01:00' : '00:00'
  const d = dateTime.split(' ')
  const utc = new Date(`${d[0]}T${d[1]}+${offset}`)
  // const offset = utc.getTimezoneOffset()
  // const localeDate = addMinutes(utc, offset)
  return utc
}

// dateTime is returned as a local time (e.g. 2022-04-12 10:00:00)
// this function converts it to UTC and formats the time properly
export const getLocalShowTime = (dateTime: string): string => {
  try {
    const utc = getLocalTime(dateTime)
    return format(utc, 'HH:mm')
    // if this fail, parse date normally and rely on system's date
  } catch (e) {
    const iso = parseISO(dateTime)
    return format(iso, 'HH:mm')
  }
}

export const decodeHtmlCharCodes = (str: string): string =>
  str
    .replace(/(&#(\d+);)/g, (match, capture, charCode) =>
      String.fromCharCode(charCode)
    )
    .replace(/&amp;/g, '&')
