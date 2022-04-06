import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppState = (): AppStateStatus => {
  const [state, setState] = useState<AppStateStatus>('unknown')

  useEffect(() => {
    AppState.addEventListener('change', (appState) => {
      setState(appState)
    })
  })

  return state
}
