import TrackPlayer, { Event } from 'react-native-track-player'
import { unregisterBackgroundTask } from './src/utils/tasks'

export default async function () {
  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    unregisterBackgroundTask()
    return await TrackPlayer.stop()
  })
  TrackPlayer.addEventListener(
    Event.RemotePause,
    async () => await TrackPlayer.pause()
  )
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    await TrackPlayer.stop()
    return await TrackPlayer.play()
  })
}
