import { MaterialIcons } from '@expo/vector-icons'
import { format, parseJSON } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { Button } from '../Button/Button'
import * as Clipboard from 'expo-clipboard'
import { Text, View } from '../Themed'

export const Track: React.FC<{
  active: boolean
  onToggle: (track: string) => void
  track: TrackInfo
}> = ({ active, track, onToggle }) => {
  const [copied, setCopied] = useState(false)
  const theme = useColorScheme()
  const timecode = parseJSON(track.played_datetime)
  const formattedTimecode = format(timecode, 'HH:mm')

  const onCopy = () => {
    try {
      Clipboard.setString(`${track.artist} - ${track.title}`)
    } catch (e) {
      console.log('There was an error copying to clipboard.')
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
          <View style={styles.timecode}>
            <Text
              style={{
                fontSize: 14,
              }}
            >
              {formattedTimecode}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => onToggle(track.played_datetime)}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ marginRight: 5 }}>
                <MaterialIcons
                  name={active ? 'expand-less' : 'expand-more'}
                  size={16}
                  color={Colors[theme].text}
                />
              </View>
              <View style={styles.trackContainer}>
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

                <View>
                  {active && (
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                      <Text style={{ fontSize: 12 }}>
                        Confidence:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {track.score / 10}/10
                        </Text>
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Album:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {track.album}
                        </Text>
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Label:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {track.label}
                        </Text>
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Release:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {track.release_date}
                        </Text>
                      </Text>
                      <View
                        style={styles.separator}
                        lightColor="#eee"
                        darkColor="rgba(255,255,255,0.1)"
                      />
                      <View style={{}}>
                        <Button
                          color={copied ? Colors[theme].primary : undefined}
                          icon={copied ? 'check' : 'content-copy'}
                          onPress={onCopy}
                        >
                          {copied ? `Copied` : 'Copy'}
                        </Button>
                      </View>
                    </View>

                    // <View
                    //   style={[
                    //     styles.codeHighlightContainer,
                    //     styles.homeScreenFilename,
                    //   ]}
                    //   darkColor="rgba(255,255,255,0.05)"
                    //   lightColor="rgba(0,0,0,0.05)"
                    // >
                    //   <Text>Album: {track.album}</Text>
                    //   <Text>Release: {track.release_date}</Text>
                    // </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
  timecode: {
    flexBasis: 60,
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
