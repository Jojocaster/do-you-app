import { StatusType } from './Status.types'

export const StatusLabels: Record<StatusType, string> = {
  [StatusType.OFF]: `We're out.`,
  [StatusType.ON]: `We're on, baby!`,
  [StatusType.LOADING]: `Checking ...`,
  [StatusType.ERROR]: `Checking ...`,
}

export const StatusColours: Record<StatusType, string> = {
  [StatusType.OFF]: `red`,
  [StatusType.ON]: `#27ae60`,
  [StatusType.LOADING]: `orange`,
  [StatusType.ERROR]: `orange`,
}
