import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { fetchSchedule } from '../../store/slices/scheduleSlice'
import { RootState, useAppDispatch } from '../../store/store'
import { ShowInfo } from '../../utils/schedule'
import { decodeHtmlCharCodes } from '../ScheduleItem/ScheduleItem.utils'

const getNextShows = (
  shows: { [key: string]: ShowInfo[] } = {},
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
  shows: { [key: string]: ShowInfo[] } = {},
  hideReplays: boolean
) => {
  const tomorrow = moment().add(1, 'day').format('yyyy-MM-DD')
  if (hideReplays) {
    return shows[tomorrow].filter((show) => !show.name.includes('(R)'))
  } else {
    return shows[tomorrow] || []
  }
}

const Show: React.FC<{ show: ShowInfo }> = ({ show }) => {
  const start = moment(show.start_timestamp).format('HH:mm')
  const end = moment(show.end_timestamp).format('HH:mm')

  return (
    <View
      key={show.start_timestamp}
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: 'white',
          flexBasis: 100,
        }}
        key={show.start_timestamp}
      >
        {start} - {end}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: 'white',
          marginLeft: 10,
          flex: 1,
        }}
      >
        {decodeHtmlCharCodes(show.name)}
      </Text>
    </View>
  )
}

export const ScheduleWidget = () => {
  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const [hideReplays, setHideReplays] = useState(false)

  const { shows, loading, lastUpdated } = useSelector(
    (state: RootState) => state.schedule
  )
  const nextShows = getNextShows(shows, hideReplays)
  const tomorrowsShows = getTomorrowShows(shows, hideReplays)

  const onRefresh = () => {
    dispatch(fetchSchedule())
  }

  const showSchedule = () => {
    navigate('Schedule')
  }

  const onToggleReplay = () => {
    setHideReplays(!hideReplays)
  }

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

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={showSchedule}>
      <View
        style={{
          borderRadius: 8,
          padding: 16,
          paddingTop: 16,
          marginHorizontal: 16,
          backgroundColor: Colors.common.purple,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Lato_900Black',
            }}
          >
            {nextShows?.length ? ' Next up' : 'Tomorrow'}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {/* Disabled for now */}
            {/* <TouchableOpacity onPress={onToggleReplay}>
              <MaterialCommunityIcons
                name={hideReplays ? 'archive' : 'archive-off'}
                size={24}
                color="white"
              />
            </TouchableOpacity> */}
            {loading ? <ActivityIndicator color="white" /> : null}
            <TouchableOpacity disabled={loading} onPress={onRefresh}>
              <MaterialCommunityIcons
                name="refresh"
                color={loading ? '#ccc' : 'white'}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          {nextShows?.length ? (
            <>
              {nextShows.map((show, i) => {
                return <Show show={show} key={i} />
              })}
            </>
          ) : tomorrowsShows?.length ? (
            <>
              {tomorrowsShows.map((show, i) => {
                return <Show show={show} key={i} />
              })}
            </>
          ) : (
            <Text style={{ color: 'white' }}>
              Nothing to see here - please refresh the schedule.
            </Text>
          )}
        </View>
        <View style={{ marginTop: 24 }}>
          <TouchableOpacity
            onPress={showSchedule}
            style={{
              alignSelf: 'flex-start',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 24,
              backgroundColor: Colors.common.pink,
            }}
          >
            <Text style={{ color: 'white', fontFamily: 'Lato_700Bold' }}>
              Full schedule
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
