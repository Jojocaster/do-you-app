import TrackPlayer, { Event } from 'react-native-track-player'

export default async function () {
  TrackPlayer.addEventListener(
    Event.RemoteStop,
    async () => await TrackPlayer.stop()
  )
  TrackPlayer.addEventListener(
    Event.RemotePause,
    async () => await TrackPlayer.pause()
  )
  TrackPlayer.addEventListener(
    Event.RemotePlay,
    async () => await TrackPlayer.play()
  )
}
