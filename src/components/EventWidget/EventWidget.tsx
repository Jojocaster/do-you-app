import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Colors from '../../constants/Colors'
import { Button, ButtonVariant } from '../Button/Button'
import moment from 'moment'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getEvents } from '../../utils/events'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useAppState } from '../../hooks/useAppState'

export interface Event {
  id: number
  title: string
  description: string
  image: string
  startDate: string
  endDate: string
  timezone: string
  sessions: any[]
  isRecurring: boolean
  location: Location
  tickets: Tickets
  rsvp: Rsvp
  tags: any[]
  organisers: any[]
}

interface Tickets {
  links: Link[]
  active: boolean
  medium: Medium
  currency: string
  priceMax: number
  priceMin: number
  priceType: string
  productHandle: any
}

interface Link {
  link: string
  label: string
}
interface Medium {
  name: string
}
interface Rsvp {
  active: boolean
  hasSeatLimit: boolean
  seatsLeft: number
  formId: number
}

export const EventItem: React.FC<{
  event: Event
  showDescription?: boolean
}> = ({ event, showDescription }) => {
  const parseHTML = (text: string) => {
    try {
      const regex = /(<([^>]+)>)/gi
      const result = text.replace(regex, '')

      return result
    } catch {
      return text
    }
  }
  const onPress = () => {
    link ? Linking.openURL(link) : null
  }
  const link = event.tickets?.links.length
    ? event.tickets?.links[0]?.link
    : null

  return (
    <TouchableOpacity
      disabled={!link}
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        shadowOffset: {
          width: 4,
          height: 4,
        },
      }}
    >
      <Image
        resizeMode="cover"
        style={{
          backgroundColor: Colors.common.yellow,
          width: '100%',
          height: 300,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        source={{ uri: event.image }}
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 12, textTransform: 'uppercase' }}>
          {moment(event.startDate).format('ddd, DD MMMM')}
        </Text>
        <Text
          style={{
            marginTop: 4,
            color: Colors.common.purple,
            fontSize: 20,
            fontFamily: 'Lato_700Bold',
          }}
        >
          {event.title}
        </Text>
        {showDescription ? (
          <Text style={{ marginTop: 16 }}>{parseHTML(event.description)}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export const EventWidget = () => {
  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const { pushEnabled } = useSelector((state: RootState) => state.settings)
  const variant: ButtonVariant = pushEnabled ? 'pink' : 'purple'
  const buttonVariant: ButtonVariant = pushEnabled ? 'yellow' : 'pink'
  const [events, setEvents] = useState<Event[]>()
  const [loading, setLoading] = useState(false)
  const appState = useAppState()

  const loadEvents = async () => {
    setLoading(true)
    try {
      const events = await getEvents()
      setEvents(events)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [isFocused, appState])

  const showAllEvents = () => {
    navigate('Events', { events })
  }

  if (!events?.length) {
    return null
  }

  const nextEvent = events[0]

  return (
    <View
      style={{
        padding: 16,
        gap: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        // backgroundColor: Colors.light.primary,
        backgroundColor:
          variant === 'pink' ? Colors.common.pink : Colors.common.purple,
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
          Events
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <>
            {loading ? (
              <ActivityIndicator color="white" style={{ marginRight: 8 }} />
            ) : null}
            <TouchableOpacity disabled={loading} onPress={loadEvents}>
              <MaterialCommunityIcons
                name="refresh"
                color={loading ? '#ccc' : 'white'}
                size={24}
              />
            </TouchableOpacity>
          </>
        </View>
      </View>

      <EventItem event={nextEvent} />

      <Button variant={buttonVariant} onPress={showAllEvents}>
        See all events
      </Button>
    </View>
  )
}
