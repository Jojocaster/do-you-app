import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RootStackScreenProps, RootTabScreenProps } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { ScheduleItem } from '../components/ScheduleItem/ScheduleItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ScheduleScreen({
  navigation,
}: RootTabScreenProps<'Schedule'>) {
  const { shows } = useSelector((state: RootState) => state.schedule)
  return (
    <ScrollView style={{ backgroundColor: '#4747DF', borderRadius: 8 }}>
      <View style={{ alignSelf: 'flex-end', padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons color="white" name="close" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 24 }}>
        {shows.map((showsByDay, i) => (
          <ScheduleItem showsOfTheDay={showsByDay} key={i} />
        ))}
      </View>
    </ScrollView>
  )
}
