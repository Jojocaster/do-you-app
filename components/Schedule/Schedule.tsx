import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SCHEDULE_URL } from '../../constants/Endpoints'
import { formatSchedule, ShowInfo } from '../../utils/schedule'
import { ScheduleItem } from '../ScheduleItem/ScheduleItem'
import { Title } from '../Title/Title'

export const Schedule: React.FC = () => {
  const [shows, setShows] = useState<ShowInfo[][]>()

  useEffect(() => {
    const getShows = async () => {
      try {
        const response = await fetch(SCHEDULE_URL)
        const data = await response.json()
        const scheduleData = formatSchedule(data)
        setShows(scheduleData)
      } catch (e) {
        console.log(e)
      }
    }

    getShows()
  }, [])

  if (!shows) {
    return null
  }

  return (
    <ScrollView indicatorStyle="white">
      {shows.map((showsOfTheDay) => (
        <ScheduleItem showsOfTheDay={showsOfTheDay} />
      ))}
    </ScrollView>
  )
}
