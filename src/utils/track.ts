import { format, intervalToDuration, parseJSON } from 'date-fns'
import { TrackInfo } from '../store/slices/tracksInfoSlice'

export const formatTrackTime = (track: TrackInfo, showStart?: string) => {
  try {
    const trackStart = parseJSON(track.played_datetime)

    if (!showStart) {
      return format(trackStart, 'HH:mm')
    }

    const date = track.played_datetime.split(' ')
    const time = date[1].split('+')
    const timecode = parseJSON(`${date[0]}T${time[0]}`)

    const startShow = parseJSON(showStart)
    const diff = timecode.getTime() - startShow.getTime()
    const tc = intervalToDuration({ start: 0, end: diff })
    const hours = `${tc.hours}`.padStart(2, '0')
    const minutes = `${tc.minutes}`.padStart(2, '0')
    const seconds = `${tc.seconds}`.padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  } catch (e) {
    console.log(e)
    return 'N/A'
  }
}

export const getTrackScore = (track: TrackInfo): string => {
  if (!track?.score || isNaN(track.score)) {
    return 'N/A'
  }

  return `${track.score / 10}/10`
}
