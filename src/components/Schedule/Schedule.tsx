import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import Colors from '../../constants/Colors'
import { SCHEDULE_URL } from '../../constants/Endpoints'
import useColorScheme from '../../hooks/useColorScheme'
import { formatSchedule, ShowInfo } from '../../utils/schedule'
import { ScheduleItem } from '../ScheduleItem/ScheduleItem'
import { Title } from '../Title/Title'

export const Schedule: React.FC = () => {
  const [shows, setShows] = useState<ShowInfo[][]>()
  const theme = useColorScheme()
  const ref = useRef<ScrollView>(null)

  useEffect(() => {
    const getShows = async () => {
      try {
        const response = await fetch(SCHEDULE_URL)
        const data = await response.json()
        const scheduleData = formatSchedule(data)
        setShows(scheduleData)
      } catch (e) {
        console.log('Error', e)
      }
    }

    getShows()
    ref.current?.flashScrollIndicators()
  }, [])

  if (!shows) {
    return <ActivityIndicator color={Colors[theme].primary} />
  }

  return (
    <ScrollView ref={ref} indicatorStyle="white" persistentScrollbar={true}>
      {shows.map((showsOfTheDay, i) => (
        <ScheduleItem key={i} showsOfTheDay={showsOfTheDay} />
      ))}
    </ScrollView>
  )
}
