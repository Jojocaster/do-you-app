import moment from 'moment'
import { FormattedSchedule } from '../../utils/schedule'

export const getNextShows = (
  shows: FormattedSchedule = {},
  hideReplays: boolean
) => {
  const today = moment().format('yyyy-MM-DD')
  const nextUp = shows[today] || []

  const nextShows = nextUp?.filter((show) => {
    if (hideReplays) {
      return (
        moment(show.start_timestamp).isAfter(moment()) &&
        !show.name.includes('(R)')
      )
    } else {
      return moment(show.start_timestamp).isAfter(moment())
    }
  })
  return nextShows
}

export const getTomorrowShows = (
  shows: FormattedSchedule = {},
  hideReplays: boolean
) => {
  const tomorrow = moment().add(1, 'day').format('yyyy-MM-DD')
  if (hideReplays) {
    return shows[tomorrow].filter((show) => !show.name.includes('(R)'))
  } else {
    return shows[tomorrow] || []
  }
}
