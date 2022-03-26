export interface ShowInfo {
  auto_dj: boolean
  description: string
  end_timestamp: string
  ends: string
  id: number
  image_cloud_file_id: string | null
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
}

export const formatSchedule = (scheduleData: Schedule) => {
  // strip out time from date
  const today = new Date().toDateString()
  const filteredKeys = Object.keys(scheduleData).reduce((acc, curr) => {
    if (curr !== 'AIRTIME_API_VERSION' && scheduleData[curr].length) {
      acc.push(scheduleData[curr])
    }

    return acc
  }, [] as ShowInfo[][])

  let schedule: ShowInfo[][] = []

  filteredKeys.forEach((day) => {
    const date = new Date(day[0].start_timestamp).toDateString()
    // ignore entry if data is in the past
    if (new Date(date).getTime() >= new Date(today).getTime()) {
      schedule.push(day)
    }
  })

  // filteredKeys.forEach((day) => {
  //   // strip out time from date so we can compare it to today's date
  //   // no need to check array as empty arrays have been filtered out
  //   const date = new Date(day[0].start_timestamp).toDateString()
  //   // ignore entry if data is in the past
  //   if (new Date(date).getTime() >= new Date(today).getTime()) {
  //     schedule[date] = day
  //   }
  // })

  console.log(filteredKeys, schedule)
  return schedule
}
