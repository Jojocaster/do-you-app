import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { RemoteTheme } from '../store/slices/appSlice'
import { RootState } from '../store/store'

export default function useCustomTheme(): RemoteTheme | null | undefined {
  const { config } = useSelector((state: RootState) => state.app)
  const { currentShow } = useSelector((state: RootState) => state.show)

  // here we try to find a theme by show name
  // as the only thing we can rely on is shows names
  const matchingTheme = config?.themes.find((t) => {
    return currentShow?.name?.includes(t.name)
    // return 'test w/ Dego'.includes(t.name)
  })

  // if no matching theme found, return the default one - which might also be null
  // however if the default theme is null, we might still get new assets
  if (!matchingTheme?.name) {
    return config?.defaultTheme
  }

  //@ts-ignore
  const customTheme = Colors[matchingTheme.theme] && matchingTheme

  // might be null, but that's ok
  return customTheme
}
