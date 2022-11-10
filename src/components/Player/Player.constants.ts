import { Platform } from 'react-native'
import { State } from 'react-native-track-player'
import deviceInfo from '../../constants/Layout'

export const PlayerStateIcons: Record<State, any> = {
  [State.None]: 'play-circle-outline',
  [State.Stopped]: 'play-circle-outline',
  [State.Paused]: 'play-circle-outline',

  [State.Buffering]: 'dots-horizontal-circle-outline',
  [State.Connecting]: 'dots-horizontal-circle-outline',
  //@ts-ignore - iOS returns undeclared "buffering" state
  buffering: 'dots-horizontal-circle-outline',

  [State.Ready]:
    Platform.OS === 'ios'
      ? 'dots-horizontal-circle-outline'
      : 'play-circle-outline',
  [State.Playing]: 'pause-circle-outline',
}

export const ARTIST_NAME = 'Do!!You!!!World'
export const DEFAULT_SHOW_NAME = `It's a family affair.`
export const PLAYER_SIZE = (50 / 100) * deviceInfo.window.width
export const STREAM_HEADERS = {
  Referer: 'https://doyouworld.airtime.pro/',
  Host: 'https://doyouworld.airtime.pro/',
  Cookie: `_ga=GA1.2.2146402785.1648138350; _gac_UA-15680315-15=1.1649969257.Cj0KCQjwjN-SBhCkARIsACsrBz4YugGttlAwxiTeq27PwB4WIW2zZIS4WszUjLoTqBsaT_erhih-YAYaAuEQEALw_wcB; _gid=GA1.2.1935128303.1652125111`,
}
