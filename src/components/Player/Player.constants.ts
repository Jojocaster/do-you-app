import { PlayerStatus } from '../../store/slices/playerSlice'
import deviceInfo from '../../constants/Layout'

export const PlayerIcons: Record<PlayerStatus, any> = {
  [PlayerStatus.PAUSED]: 'play-circle',
  [PlayerStatus.PLAYING]: 'pause-circle',
  [PlayerStatus.LOADING]: 'dots-horizontal-circle',
}

export const DEFAUT_SHOW_NAME = `It's a family affair.`
export const PLAYER_SIZE = (60 / 100) * deviceInfo.window.width
