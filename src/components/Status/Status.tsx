import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShowInfo, ShowStatus } from '../../store/slices/showSlice'
import { RootState } from '../../store/store'
import { Text, View } from '../Themed'
import { StatusColours, StatusLabels } from './Status.constants'

export const Status: React.FC = () => {
  const dispatch = useDispatch()
  const { status, lastUpdated } = useSelector((state: RootState) => state.show)
  const timeout = useRef<NodeJS.Timeout>()

  const checkStatus = async () => {
    if (!lastUpdated) {
      dispatch(fetchShowInfo())
    } else {
      const now = new Date().getTime()
      const diff = now - lastUpdated
      const diffInMinutes = diff / (1000 * 60)
      if (diffInMinutes > 1) {
        dispatch(fetchShowInfo())
      }
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  // check status every minute if not in loading state
  //TODO: turn into background service, check against schedule to avoid hammering the API
  useEffect(() => {
    if (status !== ShowStatus.LOADING) {
      // reset timeout
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        checkStatus()
      }, 1000 * 60)
    }
  }, [status])

  return (
    <View
      style={{
        paddingTop: 50,
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#121212',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>Status: </Text>
      <View
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <Text>{StatusLabels[status]}</Text>
        <MaterialCommunityIcons
          name="adjust"
          size={20}
          style={{ marginLeft: 5 }}
          color={StatusColours[status]}
        />
      </View>
    </View>
  )
}
