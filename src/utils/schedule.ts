import { isAfter, isToday, parseJSON } from 'date-fns'

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

export const formatSchedule = (scheduleData: Schedule) => {
  const today = new Date()
  const filteredKeys = Object.keys(scheduleData).reduce((acc, curr) => {
    if (curr !== 'AIRTIME_API_VERSION' && scheduleData[curr].length) {
      acc.push(scheduleData[curr])
    }

    return acc
  }, [] as ShowInfo[][])

  let schedule: ShowInfo[][] = []

  filteredKeys.forEach((day) => {
    // workaround for Android's terrible implementation of Date
    const date = parseJSON(day[0].start_timestamp)
    // ignore entry if data is in the past
    if (isAfter(date, today) || isToday(date)) {
      schedule.push(day)
    }
  })

  return schedule
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
