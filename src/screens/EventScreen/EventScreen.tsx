import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { EventItem } from '../../components/EventWidget/EventWidget'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../../../types'

export default function EventScreen({ route }: RootStackScreenProps<'Events'>) {
  const events = route.params.events
  const navigation = useNavigation()

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewWrapper}
      style={styles.scrollView}
    >
      <Text style={styles.eventText}>All events</Text>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons color="white" name="close" size={24} />
      </TouchableOpacity>

      <View style={styles.eventsWrapper}>
        {events.map((event) => (
          <EventItem showDescription key={event.id} event={event} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    padding: 24,
  },
  scrollView: {
    backgroundColor: '#4747DF',
    flexGrow: 1,
  },
  eventText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Lato_900Black',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 24,
    zIndex: 2,
  },
  eventsWrapper: { gap: 24, marginTop: 24, flexGrow: 1 },
})
