import { isToday, parseJSON } from 'date-fns'
import { format } from 'date-fns-tz'
import React from 'react'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { useAppState } from '../../hooks/useAppState'
import useColorScheme from '../../hooks/useColorScheme'
import { RootState } from '../../store/store'
import { ShowInfo } from '../../utils/schedule'
import { Text, View } from '../Themed'
import { decodeHtmlCharCodes, getLocalShowTime } from './ScheduleItem.utils'
import { MonoText } from '../StyledText'

const LiveShow: React.FC = ({ children }) => {
  const theme = useColorScheme()

  return (
    <Text
      style={{
        color: Colors[theme].primary,
        fontSize: 16,
        fontWeight: 'bold',

        marginLeft: 10,
        flex: 1,
      }}
    >
      {children}
    </Text>
  )
}

export const ScheduleItem2: React.FC<{ showsOfTheDay: ShowInfo[] }> = ({
  showsOfTheDay,
}) => {
  const { currentShow } = useSelector((state: RootState) => state.show)
  // this will allow component to re-render when appState changes
  const appState = useAppState()
  const theme = useColorScheme()
  const day = parseJSON(showsOfTheDay[0].start_timestamp)
  const formattedDay = isToday(day) ? 'Today' : format(day, 'E, MMM dd')

  return (
    <>
      <View style={{ backgroundColor: 'transparent', marginBottom: 16 }}>
        <MonoText
          style={{
            textTransform: 'uppercase',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {formattedDay}
        </MonoText>
      </View>
      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 0,
            borderBottomWidth: 2,
            borderBottomColor: Colors[theme].scheduleUnderline,
          }}
        >
          <Text
            style={{
              color: Colors[theme].scheduleHeading,
              backgroundColor: Colors[theme].scheduleBackground,
              fontSize: 14,
              fontFamily: 'Lato_900Black',
              textTransform: 'uppercase',
            }}
          >
            {formattedDay}
          </Text>
        </View>
      </View> */}

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
                  flexBasis: 100,
                }}
                key={show.start_timestamp}
              >
                {start} - {end}
              </Text>
              {isCurrent ? (
                <Text
                  style={{
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                    color: Colors[theme].scheduleText,
                    marginLeft: 10,
                    flex: 1,
                  }}
                >
                  {decodeHtmlCharCodes(show.name)}
                </Text>
              ) : (
                // <LiveShow>{decodeHtmlCharCodes(show.name)}</LiveShow>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors[theme].scheduleText,
                    marginLeft: 10,
                    flex: 1,
                  }}
                >
                  {decodeHtmlCharCodes(show.name)}
                </Text>
              )}
              {/* <Image
                style={{ height: 50, width: 50 }}
                source={{
                  uri:
                    show.image_path ||
                    'https://cdn.shopify.com/s/files/1/0555/5929/1029/t/31/assets/default.jpg',
                }}
              /> */}
            </View>
          )
        })}
      </View>
    </>
  )
}
