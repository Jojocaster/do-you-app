import TrackPlayer, { Event } from 'react-native-track-player'

export default async function () {
  TrackPlayer.addEventListener(
    Event.RemoteStop,
    async () => await TrackPlayer.stop()
  )
}
