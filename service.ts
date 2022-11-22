import TrackPlayer, { Event } from 'react-native-track-player'
import { LIVE_STREAM_URL } from './src/constants/Endpoints'
import { store } from './src/store/store'
import { getShowTitle } from './src/utils/show'
import { unregisterBackgroundTask } from './src/utils/tasks'
//@ts-ignore
import logo from './assets/images/doyou.webp'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
  STREAM_HEADERS,
} from './src/components/Player/Player.constants'

export default async function () {
  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    unregisterBackgroundTask()
    return await TrackPlayer.reset()
  })
  TrackPlayer.addEventListener(
    Event.RemotePause,
    async () => await TrackPlayer.pause()
  )
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    const { currentShow, currentTrack } = await store.getState().show
    const title = getShowTitle({ currentShow, currentTrack })

    await TrackPlayer.reset()
    await TrackPlayer.add([
      {
        url: LIVE_STREAM_URL,
        artwork: currentShow?.image_path || logo,
        album: DEFAULT_SHOW_NAME,
        artist: ARTIST_NAME,
        title,
        headers: STREAM_HEADERS,
      },
    ])

    return await TrackPlayer.play()
  })
}
