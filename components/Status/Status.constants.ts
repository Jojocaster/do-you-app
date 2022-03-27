import { StatusType } from './Status.types'

export const StatusLabels: Record<StatusType, string> = {
  [StatusType.OFF]: `We're out.`,
  [StatusType.ON]: `We're on baby!`,
  [StatusType.LOADING]: `Checking ...`,
}

export const StatusColours: Record<StatusType, string> = {
  [StatusType.OFF]: `red`,
  [StatusType.ON]: `green`,
  [StatusType.LOADING]: `orange`,
}
