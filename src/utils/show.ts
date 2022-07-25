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
  const title = currentShow?.name?.length
    ? decodeHtmlCharCodes(currentShow.name)
    : currentTrack?.name?.length
    ? decodeHtmlCharCodes(currentTrack.name)
    : DEFAULT_SHOW_NAME

  return title
}
