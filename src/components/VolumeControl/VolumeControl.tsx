import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import { updateSettings } from '../../store/slices/settingsSlice'
import { RootState } from '../../store/store'
import { View } from '../Themed'

export const VolumeControl: React.FC = () => {
  const theme = useColorScheme()
  const dispatch = useDispatch()
  const margin = Platform.OS === 'ios' ? 20 : 0
  const { volume } = useSelector((state: RootState) => state.settings)

  const setVolume = async (v: number) => {
    await TrackPlayer.setVolume(v)
    dispatch(updateSettings({ name: 'volume', value: v }))
  }

  // set volume on first render
  useEffect(() => {
    if (volume) {
      TrackPlayer.setVolume(volume)
    }
  }, [])

  // only rerender when theme changes, as <Slider /> is not a controlled component
  return useMemo(
    () => (
      <View
        style={{
          paddingHorizontal: Space.viewPadding,
          paddingVertical: 20,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Ionicons
          name="volume-off"
          color={Colors[theme].volume.icons}
          size={20}
        />
        <Slider
          style={{ flex: 1, height: 40, marginHorizontal: margin }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={setVolume}
          // set volume to 1 if never set before
          value={volume || 1}
          thumbTintColor={Colors[theme].volume.thumb}
          minimumTrackTintColor={Colors[theme].volume.trackTint}
          maximumTrackTintColor="#000000"
        />
        <Ionicons
          name="volume-medium"
          color={Colors[theme].volume.icons}
          size={20}
        />
      </View>
    ),
    [theme]
  )
}
