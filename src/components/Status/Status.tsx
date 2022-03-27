import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LIVE_INFO_URL } from '../../constants/Endpoints'
import { Text, View } from '../Themed'
import { StatusColours, StatusLabels } from './Status.constants'
import { StatusType } from './Status.types'

export const Status: React.FC = () => {
  const [status, setStatus] = useState<StatusType>(StatusType.LOADING)
  const text = StatusLabels[status]

  useEffect(() => {
    //TODO: only check live status when show scheduled
    const checkStatus = async () => {
      try {
        const response = await fetch(LIVE_INFO_URL)
        const data = await response.json()
        const isLive = data.shows.current ? StatusType.ON : StatusType.OFF
        setStatus(isLive)
      } catch (e) {
        console.log('error', e)
      }
    }

    checkStatus()
  })
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
        <Text>{text}</Text>
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
