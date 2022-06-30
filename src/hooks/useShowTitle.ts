import { useSelector } from 'react-redux'
import { DEFAULT_SHOW_NAME } from '../components/Player/Player.constants'
import { decodeHtmlCharCodes } from '../components/ScheduleItem/ScheduleItem.utils'
import { RootState } from '../store/store'

export const useShowTitle = () => {
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )

  const title = currentTrack?.name?.length
    ? decodeHtmlCharCodes(currentTrack.name)
    : currentShow?.name
    ? decodeHtmlCharCodes(currentShow?.name)
    : DEFAULT_SHOW_NAME

  return title
}
