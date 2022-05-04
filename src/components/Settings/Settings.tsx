import React from 'react'
import { Platform, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { SettingsState, updateSettings } from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import { Heading } from '../Heading/Heading'
import { Text, View } from '../Themed'
import { StyledSetting } from './Settings.styles'

const SingleSetting: React.FC<{
  beta?: boolean
  disabled?: boolean
  onToggle: () => void
  value: any
}> = ({ children, beta = false, disabled = false, onToggle, value }) => {
  // scale Switch down on iOS
  const switchScale = Platform.OS === 'ios' ? 0.8 : 1
  const theme = useColorScheme()

  return (
    <StyledSetting>
      <View style={{ position: 'relative' }}>
        <Text>{children}</Text>
        {beta && <Beta />}
      </View>
      <Switch
        style={{ transform: [{ scale: switchScale }] }}
        disabled={disabled}
        value={value}
        trackColor={{
          true: disabled
            ? Colors[theme].switch.trackDisabled
            : Colors[theme].switch.trackActive,
          false: disabled
            ? Colors[theme].switch.trackDisabled
            : Colors[theme].switch.trackInactive,
        }}
        thumbColor={
          disabled
            ? Colors[theme].switch.thumDisabled
            : Colors[theme].switch.thumb
        }
        onValueChange={onToggle}
      />
    </StyledSetting>
  )
}

const Beta: React.FC = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 8,
        fontWeight: 'bold',
        position: 'absolute',
        left: '102%',
        top: -2,
      }}
    >
      BETA
    </Text>
  )
}

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { darkTheme, liveStatusNotification, useNativeTheme } = useSelector(
    (state: RootState) => state.settings
  )

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
    </>
  )
}
