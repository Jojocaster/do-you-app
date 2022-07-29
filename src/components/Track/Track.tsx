import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useMemo, useState } from 'react'
import { Clipboard, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { formatTrackTime, getTrackScore } from '../../utils/track'
import { Button2 } from '../Button2/Button2'
import { Text, View } from '../Themed'

export const Track: React.FC<{
  active: boolean
  showStart?: string
  onToggle: (track: string) => void
  track: TrackInfo
}> = ({ active, track, onToggle, showStart }) => {
  const [copied, setCopied] = useState(false)
  const theme = useColorScheme()
  const timecode = formatTrackTime(track, showStart)

  const onCopy = () => {
    try {
      Clipboard.setString(`${track.artist} - ${track.title}`)
      console.log('[Track copy]', `${track.artist} - ${track.title}`)
    } catch (e) {
      console.log('[Track copy] There was an error copying to clipboard.', e)
    } finally {
      setCopied(true)
    }
  }

  useEffect(() => {
    setCopied(false)
  }, [active])

  // big performance impact, re-rendering all components added a ~200ms delay
  // useMemo prevents that by only re-rendering the tracks involved
  return useMemo(
    () => (
      <View>
        <View style={styles.container} key={track.played_datetime}>
          <View style={{ flexBasis: showStart ? 80 : 60 }}>
            <Text
              style={{
                fontSize: 14,
              }}
            >
              {timecode}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <View style={{ marginRight: 5 }}>
              <MaterialIcons
                name={active ? 'expand-less' : 'expand-more'}
                size={16}
                color={Colors[theme].text}
              />
            </View>
            <View style={styles.trackContainer}>
              <TouchableOpacity onPress={() => onToggle(track.played_datetime)}>
                <Text
                  style={{
                    color: Colors[theme].primary,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}
                >
                  {track.artist}
                </Text>
                <View>
                  <Text>{track.title}</Text>
                </View>
              </TouchableOpacity>
              <View>
                {active && (
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 12 }}>
                      Confidence:{' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {getTrackScore(track)}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      Album:{' '}
                      <Text style={{ fontWeight: 'bold' }}>{track.album}</Text>
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      Label:{' '}
                      <Text style={{ fontWeight: 'bold' }}>{track.label}</Text>
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      Release:{' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {track.release_date}
                      </Text>
                    </Text>

                    <View style={{ marginTop: 10 }}>
                      <Button2
                        icon={copied ? 'check' : 'content-copy'}
                        onPress={onCopy}
                      >
                        {copied ? `Copied` : 'Copy'}
                      </Button2>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
    [active, theme, copied]
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  trackContainer: {
    flex: 1,
  },
  codeHighlightContainer: {
    fontSize: 10,
    borderRadius: 3,
    padding: 20,
  },
  homeScreenFilename: {
    marginVertical: 10,
    display: 'flex',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '50%',
  },
})
