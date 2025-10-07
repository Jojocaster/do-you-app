import { MaterialCommunityIcons } from '@expo/vector-icons'
import { isAfter, isBefore, parseJSON } from 'date-fns'
import moment from 'moment'
import React, { useRef } from 'react'
import {
  Animated,
  Platform,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootTabScreenProps } from '../../../types'
import { ArchiveDetailsHeader } from '../../components/ArchiveDetails/ArchiveDetailsHeader/ArchiveDetailsHeader'
import { ArchiveItem } from '../../components/ArchivesList/ArchivesList.types'
import { BananaLoader } from '../../components/BananaLoader/BananaLoader'
import { Header } from '../../components/Header/Header'
import { TrackIDs } from '../../components/TrackIDs/TrackIDs'
import Colors from '../../constants/Colors'
import { MIXCLOUD_URL, TRACKLIST_URL } from '../../constants/Endpoints'
import { useArchives } from '../../hooks/useArchives'
import { useFetch } from '../../hooks/useFetch'
import {
  addArchive,
  deleteArchive,
} from '../../store/slices/savedArchivesSlice'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { RootState } from '../../store/store'
import { formatArchiveTitle } from '../../utils/archives'
import { ArchiveListItem } from '../../components/ArchiveListItem/ArchiveListItem'
import { Button } from '../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'

export const Tag: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: Colors.common.yellow,
        backgroundColor: Colors.common.yellow,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontFamily: 'space-mono', color: 'black', fontSize: 10 }}>
        {children}
      </Text>
    </View>
  )
}

const filterArchiveTracklist = (data: TrackInfo[] = [], track: ArchiveItem) => {
  if (!data.length) {
    return []
  }

  try {
    const showStart = parseJSON(track.start_time)
    const showEnd = parseJSON(track.end_time)

    const filteredData = data.filter((t) => {
      const date = t.played_datetime.split(' ')
      const time = date[1].split('+')
      const timecode = parseJSON(`${date[0]}T${time[0]}`)

      return isAfter(timecode, showStart) && isBefore(timecode, showEnd)
    })

    return filteredData
  } catch (e) {
    console.log(e)
    return data
  }
}

export const ArchiveDetailsNewScreen = ({
  navigation,
  route,
}: RootTabScreenProps<'ArchiveDetails'>) => {
  const archive: ArchiveItem = route.params.track
  const dispatch = useDispatch()
  const mainHost = archive.hosts?.length ? archive.hosts[0] : undefined
  const { archives: savedArchives } = useSelector(
    (state: RootState) => state.savedArchives
  )

  // const formattedDate = format(new Date(archive?.date), 'dd/MM/yyyy')
  const formattedDate = moment(archive.date).format('DD/MM/yyyy')
  const savedArchive = savedArchives?.find((a) => a.archive.id === archive.id)
  const bookmarkIcon = savedArchive ? 'bookmark' : 'bookmark-outline'

  const { error, data, loading } = useFetch<{ tracks: TrackInfo[] }>(
    `${TRACKLIST_URL}/archive/${formattedDate}`
  )

  const archiveTracks = filterArchiveTracklist(data?.tracks, archive)

  const scrollY = useRef(new Animated.Value(0)).current

  const onSave = () => {
    if (savedArchive) {
      dispatch(deleteArchive(archive))
    } else {
      dispatch(addArchive(archive))
    }
  }
  const onShare = () => {
    const url = `${MIXCLOUD_URL}/${archive.slug}`
    Share.share({ message: url })
  }

  return (
    <>
      <Header
        title="All"
        titleSize={24}
        backButton
        buttons={() => (
          <>
            <TouchableOpacity onPress={onShare}>
              <MaterialCommunityIcons
                name="share-variant"
                color="white"
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <MaterialCommunityIcons
                name={bookmarkIcon}
                color="white"
                size={24}
              />
            </TouchableOpacity>
          </>
        )}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        <Animated.ScrollView
          overScrollMode="never"
          bounces={Platform.select({ ios: true, android: false })}
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
          contentContainerStyle={{
            flexGrow: 1,
            // paddingBottom: Platform.OS === 'ios' ? 60 : 0,
          }}
          // style={styles.scrollView}
        >
          <ArchiveDetailsHeader scrollY={scrollY} track={archive} />

          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 24,
              flex: 1,
            }}
          >
            <Text
              style={{
                textTransform: 'uppercase',
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {moment(archive.date).format('ddd, DD MMM yyyy')}
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.common.purple,
                  fontWeight: 'bold',
                }}
              >
                {formatArchiveTitle(archive.name)}
              </Text>
            </View>
            <View
              style={{
                marginTop: 16,
                gap: 8,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {archive.genres?.map((genre, i) => (
                <View key={i} style={{}}>
                  <Tag>{genre.name}</Tag>
                </View>
              ))}
            </View>
            {mainHost ? (
              <View style={{ marginTop: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Archives', {
                      artist: mainHost,
                    })
                  }}
                  style={{ flexDirection: 'row' }}
                >
                  <View
                    style={{
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
                        More shows from {mainHost?.name}
                      </Text>
                      <MaterialCommunityIcons
                        size={16}
                        style={{ marginTop: 2 }}
                        name="chevron-right"
                        color={Colors.common.purple}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <Header titleSize={24} title="Tracklist">
            <Text style={{ color: 'white', marginTop: 16, marginBottom: 16 }}>
              The next best thing after Shazam. This list is generated
              automatically, so there might be a few tracks missing - or
              completely wrong.
            </Text>
          </Header>
          {archiveTracks?.length ? (
            <TrackIDs
              tracks={archiveTracks || []}
              showStart={archive.start_time}
            />
          ) : null}

          {loading ? (
            <View style={{ flex: 1 }}>
              <BananaLoader />
            </View>
          ) : null}

          {!loading && !archiveTracks.length ? (
            <View style={{ padding: 24 }}>
              <Text>No tracks found.</Text>
            </View>
          ) : null}

          {/* <ArchiveTracklist track={archive} /> */}
        </Animated.ScrollView>
      </View>
    </>
  )
}
