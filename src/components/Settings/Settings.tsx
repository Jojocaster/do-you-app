import React, { useEffect } from 'react'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import {
  fetchSettings,
  SettingsState,
  updateSettings,
} from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import { Heading } from '../Heading/Heading'
import { Text, View } from '../Themed'

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useColorScheme()
  const settings = useSelector((state: RootState) => state.settings)

  useEffect(() => {
    dispatch(fetchSettings())
  }, [])

  const onToggle = (
    key: keyof SettingsState,
    value: SettingsState[typeof key]
  ) => {
    dispatch(updateSettings({ ...settings, [key]: value }))
  }

  const { liveStatusNotification, settingsLoaded } = settings

  return (
    <View>
      <Heading>Settings</Heading>
      <View
        style={{
          marginTop: 10,
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>Notify me when a show is live</Text>
        <Switch
          disabled={!settingsLoaded}
          value={liveStatusNotification}
          trackColor={{
            true: Colors[theme].primary,
            false: 'black',
          }}
          thumbColor={'white'}
          onValueChange={() =>
            onToggle('liveStatusNotification', !liveStatusNotification)
          }
        />
      </View>
    </View>
  )
}
