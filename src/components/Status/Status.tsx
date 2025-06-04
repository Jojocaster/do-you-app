import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { fetchShowInfo, ShowStatus } from '../../store/slices/showSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'
import { StatusColours, StatusLabels } from './Status.constants'

export const Status: React.FC = () => {
  const dispatch = useDispatch()
  const { status, lastUpdated } = useSelector((state: RootState) => state.show)
  const timeout = useRef<NodeJS.Timeout>()
  const theme = useColorScheme()

  useEffect(() => {
    dispatch(fetchShowInfo())
  }, [])

  // check status every minute if not in loading state
  //TODO: turn into background service, check against schedule to avoid hammering the API
  useEffect(() => {
    // retry immediately if error
    if (status === ShowStatus.ERROR) {
      dispatch(fetchShowInfo())
      return
    }

    // ignore loading state, only trigger timeout once status is on/off
    if (status !== ShowStatus.LOADING) {
      // reset timeout
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        dispatch(fetchShowInfo())
        // TODO: increase timeout if batterySaver on?
      }, 1000 * 60)
    }
  }, [status, lastUpdated])

  return useMemo(
    () => (
      <View
        style={{
          height: 90,
          paddingTop: 50,
          paddingBottom: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: Colors[theme].statusBar,
          backgroundColor: Colors.common.purple,
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 24,
        }}
      >
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>Status: </Text>
        <View
          style={{
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>{StatusLabels[status]}</Text>
          <MaterialCommunityIcons
            name="adjust"
            size={20}
            style={{ marginLeft: 5 }}
            color={StatusColours[status]}
          />
        </View>
      </View>
    ),
    [status, theme]
  )
}
