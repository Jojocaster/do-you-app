import { Icon } from '@expo/vector-icons/build/createIconSet'
import { PlayerStatus } from '../../store/slices/playerSlice'

export const PlayerIcons: Record<PlayerStatus, any> = {
  [PlayerStatus.PAUSED]: 'play-circle',
  [PlayerStatus.PLAYING]: 'pause-circle',
  [PlayerStatus.LOADING]: 'dots-horizontal-circle',
}

export const DEFAUT_SHOW_NAME = `It's a family affair.`
