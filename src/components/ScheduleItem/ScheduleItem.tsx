import { parseISO, parseJSON } from 'date-fns'
import { format } from 'date-fns-tz'
import React from 'react'
import { ShowInfo } from '../../utils/schedule'
import { Text, useThemeColor, View } from '../Themed'

export const ScheduleItem: React.FC<{ showsOfTheDay: ShowInfo[] }> = ({
  showsOfTheDay,
}) => {
  const backgroundColor = useThemeColor({}, 'primary')
  const day = parseJSON(showsOfTheDay[0].start_timestamp)
  const formattedDay = format(day, 'E, MMM dd')

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
          const startDate = parseISO(show.start_timestamp)
          console.log('startDate', startDate)

          const start = format(startDate, 'HH:mm')
          const endDate = parseISO(show.end_timestamp)
          const end = format(endDate, 'HH:mm')

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
