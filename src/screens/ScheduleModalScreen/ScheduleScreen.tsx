import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RootStackScreenProps, RootTabScreenProps } from '../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ScheduleItem } from '../../components/ScheduleItem/ScheduleItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSchedule } from '../../store/slices/scheduleSlice'

export default function ScheduleScreen({
  navigation,
}: RootTabScreenProps<'Schedule'>) {
  const { shows } = useSelector((state: RootState) => state.schedule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSchedule())
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#4747DF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 24,
          zIndex: 2,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons color="white" name="close" size={24} />
      </TouchableOpacity>

      <View style={{ padding: 24, gap: 16 }}>
        {shows.map((showsByDay, i) => (
          <ScheduleItem showsOfTheDay={showsByDay} key={i} />
        ))}
      </View>
    </ScrollView>
  )
}
