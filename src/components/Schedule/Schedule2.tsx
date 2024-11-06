import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchSchedule } from '../../store/slices/scheduleSlice'
import { RootState } from '../../store/store'
import { ScheduleItem } from '../ScheduleItem/ScheduleItem'
import { View } from '../Themed'
import { Button2 } from '../Button2/Button2'
import { ScheduleItem2 } from '../ScheduleItem/ScheduleItem2'

export const Schedule2: React.FC = () => {
  const isFocused = useIsFocused()
  // const ref = useRef<ScrollView>(null)
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
    // <View
    //   style={{
    //     height: Layout.window.height / 2 - 50,
    //     backgroundColor: 'transparent',
    //   }}
    // >
    //   <ScrollView
    //     nestedScrollEnabled
    //     refreshControl={
    //       <RefreshControl
    //         tintColor={Colors[theme].primary}
    //         colors={[Colors[theme].primary]}
    //         refreshing={loading}
    //         onRefresh={() => dispatch(fetchSchedule())}
    //       />
    //     }
    //     showsVerticalScrollIndicator={false}
    //     // fadingEdgeLength={100}
    //     // overScrollMode="never"
    //     contentContainerStyle={{
    //       paddingVertical: Space.viewPadding,
    //     }}
    //     style={{
    //       backgroundColor: 'transparent',
    //     }}
    //   >
    <>
      <ScheduleItem2 showsOfTheDay={shows[0]} />

      {/* {shows.map((showsOfTheDay, i) => (
        <ScheduleItem key={i} showsOfTheDay={showsOfTheDay} />
      ))} */}
    </>
    // </ScrollView>
    // </View>
  )
}
