import { PlayerStatus } from '../../store/slices/playerSlice'
import deviceInfo from '../../constants/Layout'

export const PlayerIcons: Record<PlayerStatus, any> = {
  [PlayerStatus.PAUSED]: 'play-circle',
  [PlayerStatus.PLAYING]: 'pause-circle',
  [PlayerStatus.LOADING]: 'dots-horizontal-circle',
}

export const ARTIST_NAME = 'Do!!You!!!World'
export const DEFAULT_SHOW_NAME = `It's a family affair.`
export const PLAYER_SIZE = (60 / 100) * deviceInfo.window.width
export const STREAM_HEADERS = {
  Referer: 'https://doyouworld.airtime.pro/',
  Host: 'https://doyouworld.airtime.pro/',
  Cookie: `_ga=GA1.2.2146402785.1648138350; _gac_UA-15680315-15=1.1649969257.Cj0KCQjwjN-SBhCkARIsACsrBz4YugGttlAwxiTeq27PwB4WIW2zZIS4WszUjLoTqBsaT_erhih-YAYaAuEQEALw_wcB; _gid=GA1.2.1935128303.1652125111`,
}
