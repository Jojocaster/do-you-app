import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { Button } from '../../components/Button/Button'
import * as Clipboard from 'expo-clipboard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Metadata: React.FC<{ tKey: string; value: string }> = ({
  tKey,
  value = 'N/A',
}) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    }}
  >
    <Text
      style={{
        alignSelf: 'baseline',
        color: 'white',
        fontSize: 16,
        marginTop: 1,
        width: 70,
      }}
    >
      {tKey}:
    </Text>
    <Text
      style={{
        marginLeft: 8,
        flex: 1,
        color: 'white',
        marginTop: 8,
        fontSize: 18,
        fontFamily: 'Lato_900Black',
      }}
    >
      {value}
    </Text>
  </View>
)

export const TrackDetailsScreen = ({ route }) => {
  const navigation = useNavigation()
  const [copied, setCopied] = useState(false)
  const track = route.params.track as TrackInfo

  const copyToClipboard = async () => {
    setCopied(false)
    const value = `${track.artist} - ${track.title}`
    await Clipboard.setStringAsync(value)
    setCopied(true)
  }

  return (
    <ScrollView
      contentContainerStyle={{ height: '100%', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: Colors.common.pink,

          borderRadius: 4,
          padding: 24,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 24,
            zIndex: 2,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons color="white" name="close" size={24} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontFamily: 'Lato_900Black',
            maxWidth: '90%',
          }}
        >
          {track.artist}
        </Text>
        <Text style={{ color: 'white', fontSize: 32, marginTop: 16 }}>
          {track.title}
        </Text>
        <View style={{ marginVertical: 32, gap: 8 }}>
          <Metadata tKey="Album" value={track.album} />
          <Metadata tKey="Label" value={track.label} />
          <Metadata tKey="Release" value={track.release_date} />
          <Metadata tKey="Score" value={`${track.score / 10} /10`} />
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Button onPress={copyToClipboard} variant="yellow">
            {copied ? 'Done!' : 'Copy to clipboard'}
          </Button>
          <Button
            onPress={() => Linking.openURL(track.song_link)}
            variant="purple"
          >
            Listen
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
