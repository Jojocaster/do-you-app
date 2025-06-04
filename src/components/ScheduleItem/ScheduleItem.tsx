import { parseJSON } from 'date-fns'
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
import moment from 'moment'

const LiveShow: React.FC = ({ children }) => {
  const theme = useColorScheme()

  return (
    <Text
      style={{
        color: '#FDC151',
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

export const ScheduleItem: React.FC<{ showsOfTheDay: ShowInfo[] }> = ({
  showsOfTheDay,
}) => {
  const { currentShow } = useSelector((state: RootState) => state.show)
  // this will allow component to re-render when appState changes
  // console.log(showsOfTheDay[0].start_timestamp)
  // console.log(moment(showsOfTheDay[0].start_timestamp))
  // const day = parseJSON(showsOfTheDay[0].start_timestamp)
  const day = moment(showsOfTheDay[0].start_timestamp)
  // console.log('yo', moment.utc(showsOfTheDay[0].start_timestamp))
  // const formattedDay = format(day, 'E, MMM dd')
  const formattedDay = moment(day).format('dddd, DD MMM')
  const isToday = moment(day).isSame(moment(), 'day')
  const isTomorrow = moment(day).isSame(moment().add(1, 'day'), 'day')
  const dayToDisplay = isToday
    ? 'Today'
    : isTomorrow
    ? 'Tomorrow'
    : formattedDay

  return (
    <>
      <View
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
            // borderBottomWidth: 2,
            // borderBottomColor: 'white',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Lato_900Black',
              textTransform: 'uppercase',
            }}
          >
            {dayToDisplay}
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
            moment(show.start_timestamp).isSame(moment(), 'day')

          const start = moment(show.start_timestamp).format('HH:mm')
          const end = moment(show.end_timestamp).format('HH:mm')

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
                  color: 'white',
                  flexBasis: 100,
                }}
                key={show.start_timestamp}
              >
                {start} - {end}
              </Text>
              {isCurrent ? (
                <LiveShow>{decodeHtmlCharCodes(show.name)}</LiveShow>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'white',
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
