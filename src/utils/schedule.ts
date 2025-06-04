import { isAfter, isToday, parseJSON } from 'date-fns'
import moment from 'moment'

export interface ShowInfo {
  auto_dj: boolean
  description: string
  end_timestamp: string
  ends: string
  id: number
  image_cloud_file_id: string | number | null
  image_path: string
  instance_description: string
  instance_id: number
  name: string
  record: number
  start_timestamp: string
  starts: string
  url: string
}

export interface Schedule {
  [key: string]: ShowInfo[]
  AIRTIME_API_VERSION: any
}

export interface FormattedSchedule {
  [key: string]: ShowInfo[]
}

export const formatSchedule = (scheduleData: Schedule): FormattedSchedule => {
  const showsByDay = Object.keys(scheduleData).reduce((acc, curr) => {
    const showsForCurrentDay = scheduleData[curr]

    if (curr !== 'AIRTIME_API_VERSION' && showsForCurrentDay.length) {
      showsForCurrentDay.map((show) => {
        const showDate = moment(show.start_timestamp).format('yyyy-MM-DD')
        if (!acc[showDate]) {
          acc[showDate] = []
        }

        acc[showDate].push(show)
      })
    }

    return acc
  }, {} as FormattedSchedule)
  const filteredShowsByDay = Object.keys(showsByDay).reduce((acc, curr) => {
    if (moment(curr).isSameOrAfter(moment(), 'day')) {
      acc[curr] = showsByDay[curr]
    }

    return acc
  }, {} as FormattedSchedule)

  // const filteredKeys = Object.keys(scheduleData).reduce((acc, curr) => {
  //   if (curr !== 'AIRTIME_API_VERSION' && scheduleData[curr].length) {
  //     acc.push(scheduleData[curr])
  //   }

  //   return acc
  // }, [] as ShowInfo[][])

  // let schedule: ShowInfo[][] = []

  // filteredKeys.forEach((day) => {
  //   // workaround for Android's terrible implementation of Date
  //   const date = moment(day[0].start_timestamp)
  //   // ignore entry if data is in the past
  //   if (
  //     moment(date).isSame(moment(), 'day') ||
  //     moment(date).isAfter(moment())
  //   ) {
  //     // if (isAfter(date, today) || isToday(date)) {
  //     schedule.push(day)
  //   }
  // })

  return filteredShowsByDay

  // return schedule
}

// export const getCurrentShowFromSchedule = (
//   shows: ShowInfo[][]
// ): ShowInfo | undefined => {
//   if (!shows.length) {
//     return
//   }

//   const now = new Date()
//   const todaysShows = shows[0]
//   const currentShow = todaysShows.find((show) => {
//     const start = parseJSON(show.start_timestamp)
//     const end = parseJSON(show.end_timestamp)

//     return (
//       now.getHours() >= start.getUTCHours() &&
//       now.getHours() <= end.getUTCHours()
//     )
//   })

//   return currentShow
// }
