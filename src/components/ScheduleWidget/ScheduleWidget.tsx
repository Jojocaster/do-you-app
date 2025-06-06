import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { fetchSchedule } from '../../store/slices/scheduleSlice'
import { RootState, useAppDispatch } from '../../store/store'
import { ShowInfo } from '../../utils/schedule'
import { decodeHtmlCharCodes } from '../ScheduleItem/ScheduleItem.utils'
import { StyleSheet } from 'react-native'
import { getNextShows, getTomorrowShows } from './utils'
import { Button } from '../Button/Button'

const Show: React.FC<{ show: ShowInfo }> = ({ show }) => {
  const start = moment(show.start_timestamp).format('HH:mm')
  const end = moment(show.end_timestamp).format('HH:mm')

  return (
    <View key={show.start_timestamp} style={styles.show}>
      <Text style={styles.timing} key={show.start_timestamp}>
        {start} - {end}
      </Text>
      <Text style={styles.showName}>{decodeHtmlCharCodes(show.name)}</Text>
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
      <View style={styles.widget}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>
            {nextShows?.length ? ' Next up' : 'Tomorrow'}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onToggleReplay} hitSlop={16}>
              <MaterialCommunityIcons
                name={
                  hideReplays ? 'archive-eye-outline' : 'archive-remove-outline'
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>
            {loading ? <ActivityIndicator color="white" /> : null}
            <TouchableOpacity
              hitSlop={8}
              disabled={loading}
              onPress={onRefresh}
            >
              <MaterialCommunityIcons
                name="refresh"
                color={loading ? '#ccc' : 'white'}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shows}>
          {nextShows?.length ? (
            <View style={styles.showWrapper}>
              {nextShows.map((show, i) => {
                return <Show show={show} key={i} />
              })}
            </View>
          ) : tomorrowsShows?.length ? (
            <View style={styles.showWrapper}>
              {tomorrowsShows.map((show, i) => {
                return <Show show={show} key={i} />
              })}
            </View>
          ) : (
            <Text style={styles.noData}>
              Nothing to see here - please refresh the schedule.
            </Text>
          )}
        </View>
        <View style={styles.cta}>
          <Button variant="pink" onPress={showSchedule}>
            Full schedule
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  widget: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: Colors.common.purple,
  },
  widgetHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  widgetTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lato_900Black',
  },
  buttons: { flexDirection: 'row', gap: 8 },
  shows: { marginTop: 16 },
  showWrapper: {
    gap: 16,
  },
  show: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  showName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
    flex: 1,
  },
  timing: {
    fontSize: 14,
    color: 'white',
    flexBasis: 100,
  },
  noData: { color: 'white' },
  cta: { marginTop: 24 },
})
