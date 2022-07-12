import { useIsFocused } from '@react-navigation/native'
import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
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
    const diff = today.getTime() - new Date(lastUpdated).getTime()
    const diffInHours = diff / (1000 * 60 * 60)

    // fetch every hour to avoid hammering the API
    if (diffInHours > 1) {
      dispatch(fetchSchedule())
    }
  }, [isFocused, lastUpdated])

  if (loading && !shows.length) {
    return <ActivityIndicator color={Colors[theme].primary} />
  }

  return (
    <ScrollView
      ref={ref}
      refreshControl={
        <RefreshControl
          colors={[Colors[theme].primary]}
          refreshing={loading}
          onRefresh={() => dispatch(fetchSchedule())}
        />
      }
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={100}
      overScrollMode="never"
      style={{ backgroundColor: Colors[theme].scheduleBackground }}
    >
      {shows.map((showsOfTheDay, i) => (
        <ScheduleItem key={i} showsOfTheDay={showsOfTheDay} />
      ))}
    </ScrollView>
  )
}
