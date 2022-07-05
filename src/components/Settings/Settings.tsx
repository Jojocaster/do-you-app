import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingsState, updateSettings } from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import {
  getToken,
  registerToken,
  unregisterToken,
} from '../../utils/notifications'
import { Heading } from '../Heading/Heading'
import { SingleSetting } from '../SingleSetting/SingleSetting'

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { batterySaver, darkTheme, pushEnabled, useNativeTheme, token } =
    useSelector((state: RootState) => state.settings)

  const onToggle = (
    key: keyof SettingsState,
    value: SettingsState[typeof key]
  ) => {
    dispatch(updateSettings({ name: key, value }))
  }

  const togglePushNotifications = async (isEnabled: boolean) => {
    // toggle state first so users don't wait for API calls
    onToggle('pushEnabled', !isEnabled)

    // if option isn't on, go through token flow
    if (!isEnabled) {
      // grab token from storage if available, otherwise request it from device
      const newToken = token || (await getToken())

      // send token to API
      const success = await registerToken(newToken)

      // store token if success
      if (success) {
        onToggle('token', newToken)
      } else {
        // reset setting otherwise
        onToggle('pushEnabled', false)
      }
      // otherwise, remove token from DB & device
    } else {
      // grab token from storage if available, otherwise request it from device
      const newToken = token || (await getToken())
      if (newToken) {
        try {
          await unregisterToken(newToken)
          onToggle('pushEnabled', false)
          onToggle('token', undefined)
        } catch (e) {
          onToggle('pushEnabled', true)
        }
      }
    }
  }

  return (
    <>
      <Heading style={{ fontSize: 32 }}>Settings</Heading>
      <SingleSetting
        value={pushEnabled}
        onToggle={() => togglePushNotifications(pushEnabled)}
      >
        Enable notifications
      </SingleSetting>
      <SingleSetting
        value={useNativeTheme}
        onToggle={() => onToggle('useNativeTheme', !useNativeTheme)}
      >
        Use native theme
      </SingleSetting>
      <SingleSetting
        disabled={useNativeTheme}
        value={darkTheme}
        onToggle={() => onToggle('darkTheme', !darkTheme)}
      >
        Dark theme
      </SingleSetting>
      <SingleSetting
        beta
        value={batterySaver}
        onToggle={() => onToggle('batterySaver', !batterySaver)}
      >
        Battery saver
      </SingleSetting>
    </>
  )
}
