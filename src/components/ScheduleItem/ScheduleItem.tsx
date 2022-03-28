import React, { useRef } from 'react'
import { ShowInfo } from '../../utils/schedule'
import { Text, useThemeColor, View } from '../Themed'

const formatShowTime = (date: Date) => {
  return `${date
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${date
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
}

export const ScheduleItem: React.FC<{ showsOfTheDay: ShowInfo[] }> = ({
  showsOfTheDay,
}) => {
  const backgroundColor = useThemeColor({}, 'primary')
  const day = new Date(showsOfTheDay[0].start_timestamp)
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }
  const formattedDay = new Intl.DateTimeFormat('en-UK', options as any).format(
    day
  )

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View
          style={{
            flex: 0,
            borderBottomWidth: 2,
            borderBottomColor: backgroundColor,
          }}
        >
          <Text
            style={{
              color: 'white',
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
          const start = formatShowTime(new Date(show.start_timestamp))
          const end = formatShowTime(new Date(show.end_timestamp))

          return (
            <View
              key={show.id}
              style={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginVertical: 5,
              }}
            >
              <Text
                style={{ fontSize: 14, color: 'white', flexBasis: 90 }}
                key={show.id}
              >
                {start} - {end}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',

                  marginLeft: 10,
                  flex: 1,
                }}
              >
                {show.name}
              </Text>
            </View>
          )
        })}
      </View>
    </>
  )
}
