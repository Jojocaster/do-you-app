import React from 'react'
import { ShowInfo } from '../../utils/schedule'
import { Text, View } from '../Themed'

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
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Lato_900Black',
          textTransform: 'uppercase',
        }}
      >
        {formattedDay}
      </Text>
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
              style={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }} key={show.id}>
                {start}-{end}:
              </Text>
              <Text
                style={{
                  fontSize: 16,
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
