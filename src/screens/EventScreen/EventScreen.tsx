import { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Event, EventItem } from '../../components/EventWidget/EventWidget'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function EventScreen({ route }) {
  const events: Event[] = route.params.events
  const navigation = useNavigation()

  return (
    <ScrollView
      // showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 24,
      }}
      style={{
        backgroundColor: '#4747DF',

        // height: '100%',
        flexGrow: 1,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontFamily: 'Lato_900Black',
        }}
      >
        All events
      </Text>
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

      <View style={{ gap: 24, marginTop: 24, flexGrow: 1 }}>
        {events.map((event) => (
          <EventItem showDescription key={event.id} event={event} />
        ))}
      </View>
    </ScrollView>
  )
}
