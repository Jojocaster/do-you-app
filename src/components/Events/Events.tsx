import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'
import React, { useEffect } from 'react'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchEvents } from '../../store/slices/eventsSlice'
import { RootState } from '../../store/store'
import { Text, View as CustomView } from '../Themed'

export const Events = () => {
  const theme = useColorScheme()
  const { events_data, event_dates } = useSelector(
    (state: RootState) => state.events
  )
  const layout = useWindowDimensions()
  const CustomTouchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  if (!event_dates?.length) {
    return (
      <View
        style={{
          height: layout.height / 2 - 75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons
          color={Colors[theme].text}
          name="radio-off"
          size={20}
        />
        <Text style={{ marginTop: 10 }}>Nothing to see here - yet</Text>
      </View>
    )
  }

  return (
    <View style={{ height: layout.height / 2 - 75 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Space.viewPadding }}
      >
        {events_data.map((event) => {
          const date = new Date(event.start_date.date)
          const formattedDate = format(date, 'E, MMM dd')
          return (
            //@ts-ignore
            <CustomTouchable
              key={event.id}
              onPress={() => Linking.openURL(event.ticket_links[0].link)}
            >
              <CustomView style={styles.container}>
                <Image style={styles.image} source={{ uri: event.image }} />
                <View style={styles.content}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontSize: 10,
                      marginBottom: 5,
                    }}
                  >
                    {formattedDate}
                  </Text>
                  <Text style={styles.title}>{event.title}</Text>
                </View>
              </CustomView>
            </CustomTouchable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  image: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
})
