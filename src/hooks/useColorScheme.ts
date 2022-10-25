import { useEffect, useState } from 'react'
import { ColorSchemeName } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import useCustomTheme from './useCustomTheme'

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  // store system theme
  // const nativeTheme = _useColorScheme() as NonNullable<ColorSchemeName>
  // get settings from store
  const { darkTheme } = useSelector((state: RootState) => state.settings)
  const customTheme = useCustomTheme()
  //set local theme based on store
  const [theme, setTheme] = useState<NonNullable<ColorSchemeName>>(
    darkTheme ? 'dark' : 'light'
  )

  // update local theme on change
  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light')
  }, [darkTheme])

  return customTheme?.theme || theme
}
