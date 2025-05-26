import moment from 'moment'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { formatTrackTime } from '../../utils/track'

export const TrackIDs: React.FC<{
  tracks: TrackInfo[]
  showStart?: string
}> = ({ tracks, showStart }) => {
  const { navigate } = useNavigation()

  const showTrackDetails = (track: TrackInfo) => {
    navigate('TrackDetails', { track })
  }

  return (
    <View style={{ padding: 16, gap: 16 }}>
      {tracks.map((track, i) => {
        const timecode = formatTrackTime(track, showStart)

        return (
          <TouchableOpacity
            key={i}
            onPress={() => showTrackDetails(track)}
            style={{ flexDirection: 'row' }}
          >
            <View>
              <Text>{timecode}</Text>
            </View>
            <View
              style={{
                marginLeft: 32,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: Colors.common.purple,
                    fontFamily: 'Lato_900Black',
                  }}
                >
                  {track.artist ? track.artist.toUpperCase() : 'N/A'}
                </Text>
                <MaterialCommunityIcons
                  size={16}
                  name="chevron-right"
                  color={Colors.common.purple}
                />
              </View>
              <Text style={{ marginTop: 4, flexWrap: 'wrap' }}>
                {track.title}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
