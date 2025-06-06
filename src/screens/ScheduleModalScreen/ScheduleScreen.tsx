import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(fetchSchedule())
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons color="white" name="close" size={24} />
      </TouchableOpacity>

      <View style={styles.scheduleItems}>
        {Object.values(shows).map((showsByDay, i) => (
          <ScheduleItem showsOfTheDay={showsByDay} key={i} />
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
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 24,
    zIndex: 2,
  },
  scheduleItems: { padding: 24, gap: 24 },
})
