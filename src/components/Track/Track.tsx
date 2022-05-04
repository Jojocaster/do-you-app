import { MaterialIcons } from '@expo/vector-icons'
import { format, parseJSON } from 'date-fns'
import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { MonoText } from '../StyledText'
import { Text, View } from '../Themed'

export const Track: React.FC<{
  active: boolean
  onToggle: (track: string) => void
  track: TrackInfo
}> = ({ active, track, onToggle }) => {
  const theme = useColorScheme()
  const timecode = parseJSON(track.played_datetime)
  const formattedTimecode = format(timecode, 'HH:mm')

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
                    color: Colors[theme].tracks.artist,
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
    [active, theme]
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
})
