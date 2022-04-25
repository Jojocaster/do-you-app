import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'

// dateTime is returned as a local time (e.g. 2022-04-12 10:00:00)
// this function converts it to UTC and formats the time properly
export const getLocalShowTime = (dateTime: string): string => {
  try {
    const d = dateTime.split(' ')
    // convert date to BST/GMT
    const utc = new Date(`${d[0]}T${d[1]}+01:00`)
    return format(utc, 'HH:mm')
    // if this fail, parse date normally and rely on system's date
  } catch (e) {
    const iso = parseISO(dateTime)
    return format(iso, 'HH:mm')
  }
}

export const decodeHtmlCharCodes = (str: string): string =>
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    String.fromCharCode(charCode)
  )
