import { differenceInMinutes, format } from 'date-fns'

import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { RootState } from '../../store/store'
import { getLocalTime } from '../ScheduleItem/ScheduleItem.utils'
import { Text, View } from '../Themed'

export const ShowProgress = () => {
  const theme = useColorScheme()
  const { status, currentShow } = useSelector((state: RootState) => state.show)

  if (!currentShow) {
    return null
  }

  const now = new Date()
  const start = getLocalTime(currentShow?.starts)
  const end = getLocalTime(currentShow?.ends)
  const diffFromStart = differenceInMinutes(now, start)
  const length = differenceInMinutes(end, start)

  const diff = Math.min(Math.max((diffFromStart / length) * 100, 0), 100)

  if (isNaN(diff)) {
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',

        marginTop: 20,
        paddingHorizontal: Space.viewPadding,
      }}
    >
      <View
        style={{
          height: 4,
          width: '100%',
          backgroundColor: '#F9F9FB',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${diff}%`,
            backgroundColor: Colors.common.yellow,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5 }}>
          {format(start, 'HH:mm')}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5 }}>
          {format(end, 'HH:mm')}
        </Text>
      </View>
    </View>
  )
}
