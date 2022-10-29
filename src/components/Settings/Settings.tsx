import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingsState, updateSettings } from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import {
  getToken,
  registerToken,
  unregisterToken,
  updatePushSettings,
} from '../../utils/notifications'
import { Heading } from '../Heading/Heading'
import { SingleSetting } from '../SingleSetting/SingleSetting'

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { batterySaver, darkTheme, pushEnabled, ignoreReruns, token } =
    useSelector((state: RootState) => state.settings)

  const onToggle = (
    key: keyof SettingsState,
    value: SettingsState[typeof key]
  ) => {
    dispatch(updateSettings({ name: key, value }))
  }

  const toggleIgnoreReruns = async (isEnabled: boolean) => {
    // toggle state first so users don't wait for API calls
    onToggle('ignoreReruns', !isEnabled)

    try {
      const success = await updatePushSettings(token as string, !isEnabled)
      if (!success) {
        onToggle('ignoreReruns', isEnabled)
      }
    } catch (e) {
      onToggle('ignoreReruns', isEnabled)
    }
  }

  const togglePushNotifications = async (isEnabled: boolean) => {
    // toggle state first so users don't wait for API calls
    onToggle('pushEnabled', !isEnabled)

    // if option isn't on, go through token flow
    if (!isEnabled) {
      try {
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
      } catch (e) {
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
      <Heading style={{ fontSize: 28, marginBottom: 5 }}>Settings</Heading>
      <SingleSetting
        value={pushEnabled}
        onToggle={() => togglePushNotifications(pushEnabled)}
      >
        Enable notifications
      </SingleSetting>
      <SingleSetting
        disabled={!pushEnabled}
        value={ignoreReruns}
        onToggle={() => toggleIgnoreReruns(ignoreReruns)}
      >
        Disable notifications for re-runs
      </SingleSetting>
      <SingleSetting
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
