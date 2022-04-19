import { parseJSON } from 'date-fns'
import { format } from 'date-fns-tz'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { useAppState } from '../../hooks/useAppState'
import useColorScheme from '../../hooks/useColorScheme'
import { RootState } from '../../store/store'
import { ShowInfo } from '../../utils/schedule'
import { Text, useThemeColor, View } from '../Themed'
import { getLocalShowTime } from './ScheduleItem.utils'

const LiveShow: React.FC = ({ children }) => {
  const theme = useColorScheme()
  const anim = useRef(new Animated.Value(1))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start()
  }, [])

  return (
    <Animated.Text
      style={{
        color: Colors[theme].primary,
        opacity: anim.current,
        fontSize: 16,
        fontWeight: 'bold',

        marginLeft: 10,
        flex: 1,
      }}
    >
      {children}
    </Animated.Text>
  )
}

export const ScheduleItem: React.FC<{ showsOfTheDay: ShowInfo[] }> = ({
  showsOfTheDay,
}) => {
  const { currentShow } = useSelector((state: RootState) => state.show)
  // this will allow component to re-render when appState changes
  const appState = useAppState()
  const theme = useColorScheme()
  const backgroundColor = useThemeColor({}, 'primary')
  const day = parseJSON(showsOfTheDay[0].start_timestamp)
  const formattedDay = format(day, 'E, MMM dd')

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: Colors[theme].scheduleBackground,
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].scheduleBackground,
            flex: 0,
            borderBottomWidth: 2,
            borderBottomColor: backgroundColor,
          }}
        >
          <Text
            style={{
              color: Colors[theme].scheduleHeading,
              backgroundColor: Colors[theme].scheduleBackground,
              fontSize: 16,
              fontFamily: 'Lato_900Black',
              textTransform: 'uppercase',
            }}
          >
            {formattedDay}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          // marginHorizontal: 15,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        {showsOfTheDay.map((show) => {
          // TODO: improve logic
          const isCurrent =
            show.name === currentShow?.name &&
            show.starts === currentShow.starts

          const start = getLocalShowTime(show.start_timestamp)
          const end = getLocalShowTime(show.end_timestamp)

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
                  color: Colors[theme].scheduleText,
                  flexBasis: 90,
                }}
                key={show.start_timestamp}
              >
                {start} - {end}
              </Text>
              {isCurrent ? (
                <LiveShow>{show.name}</LiveShow>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors[theme].scheduleText,
                    marginLeft: 10,
                    flex: 1,
                  }}
                >
                  {show.name}
                </Text>
              )}
            </View>
          )
        })}
      </View>
    </>
  )
}
