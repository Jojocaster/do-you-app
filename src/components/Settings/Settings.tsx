import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingsState, updateSettings } from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import { Heading } from '../Heading/Heading'
import { SingleSetting } from '../SingleSetting/SingleSetting'

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { batterySaver, darkTheme, liveStatusNotification, useNativeTheme } =
    useSelector((state: RootState) => state.settings)

  const onToggle = (
    key: keyof SettingsState,
    value: SettingsState[typeof key]
  ) => {
    dispatch(updateSettings({ name: key, value }))
  }

  return (
    <>
      <Heading style={{ fontSize: 32 }}>Settings</Heading>
      <SingleSetting
        beta
        value={liveStatusNotification}
        onToggle={() =>
          onToggle('liveStatusNotification', !liveStatusNotification)
        }
      >
        Notify me when a show is live
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
