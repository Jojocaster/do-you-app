import { useIsFocused } from '@react-navigation/native'
import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchSchedule } from '../../store/slices/scheduleSlice'
import { RootState } from '../../store/store'
import { ScheduleItem } from '../ScheduleItem/ScheduleItem'

export const Schedule: React.FC = () => {
  const isFocused = useIsFocused()
  const ref = useRef<ScrollView>(null)
  const dispatch = useDispatch()
  const { shows, loading, lastUpdated } = useSelector(
    (state: RootState) => state.schedule
  )

  const theme = useColorScheme()

  useEffect(() => {
    // if schedule has never been updated (~fetched), fetch it now
    if (!lastUpdated) {
      dispatch(fetchSchedule())
      return
    }
    const today = new Date()
    // console.log('date now', today)
    // console.log('last updated: ', new Date(lastUpdated))
    const diff = today.getTime() - new Date(lastUpdated).getTime()
    const diffInHours = diff / (1000 * 60 * 60)
    // console.log('diff in hours', diffInHours)

    // fetch every hour to avoid hammering the API
    if (diffInHours > 1) {
      dispatch(fetchSchedule())
    }
  }, [isFocused, lastUpdated])

  if (loading) {
    return <ActivityIndicator color={Colors[theme].primary} />
  }

  // useEffect(() => {
  //   if (!isFocused) {
  //     if (ref.current) {
  //       ref.current.scrollTo({ x: 0, y: 0, animated: false })
  //     }
  //   }
  // }, [isFocused])

  return (
    <ScrollView
      ref={ref}
      indicatorStyle="white"
      fadingEdgeLength={50}
      overScrollMode="never"
    >
      {shows.map((showsOfTheDay, i) => (
        <ScheduleItem key={i} showsOfTheDay={showsOfTheDay} />
      ))}
    </ScrollView>
  )
}
