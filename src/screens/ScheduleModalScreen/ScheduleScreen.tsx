import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootTabScreenProps } from '../../../types'
import { ScheduleItem } from '../../components/ScheduleItem/ScheduleItem'
import { fetchSchedule } from '../../store/slices/scheduleSlice'
import { RootState, useAppDispatch } from '../../store/store'

export default function ScheduleScreen({
  navigation,
}: RootTabScreenProps<'Schedule'>) {
  const { shows } = useSelector((state: RootState) => state.schedule)
  const dispatch = useAppDispatch()
  const [hideReplays, setHideReplays] = useState(false)

  useEffect(() => {
    dispatch(fetchSchedule())
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => setHideReplays(!hideReplays)}
        >
          <MaterialCommunityIcons
            color="white"
            name={
              hideReplays ? 'archive-eye-outline' : 'archive-remove-outline'
            }
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons color="white" name="close" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.scheduleItems}>
        {Object.values(shows).map((showsByDay, i) => (
          <ScheduleItem
            hideReplays={hideReplays}
            showsOfTheDay={showsByDay}
            key={i}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#4747DF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  buttons: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 24,
    zIndex: 2,
    flexDirection: 'row',
  },
  filter: {
    paddingHorizontal: 4,
  },
  close: { paddingLeft: 4 },
  scheduleItems: { padding: 24, gap: 24 },
})
