import { DEFAULT_SHOW_NAME } from '../components/Player/Player.constants'
import { decodeHtmlCharCodes } from '../components/ScheduleItem/ScheduleItem.utils'
import { CurrentShowInfo, CurrentTrackInfo } from '../store/slices/showSlice'

export const getShowTitle = ({
  currentShow,
  currentTrack,
}: {
  currentShow?: CurrentShowInfo | null
  currentTrack?: CurrentTrackInfo | null
}) => {
  if (currentShow?.name?.length) {
    return decodeHtmlCharCodes(currentShow.name)
  }
  if (currentTrack?.name.length) {
    return decodeHtmlCharCodes(currentTrack.name)
  }

  if (currentTrack) {
    return 'Overtime / Surprise show'
  }

  return DEFAULT_SHOW_NAME
}
