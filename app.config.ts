import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  //@ts-ignore
  const target = process.env.TARGET

  const appName =
    target === 'dev'
      ? `${config.name} Dev`
      : target === 'preview'
      ? `${config.name} Preview`
      : config.name
  //@ts-ignore
  const packageName =
    target === 'dev'
      ? 'com.wonkylines.doyouworld.dev'
      : target === 'preview'
      ? 'com.wonkylines.doyouworld.preview'
      : 'com.wonkylines.doyouworld'

  return {
    ...config,
    name: appName,
    plugins: ['expo-asset', 'expo-localization', 'expo-web-browser'],
    ios: {
      ...config.ios,
      bundleIdentifier: packageName,
    },
    android: {
      ...config.android,
      package: packageName,
      googleServicesFile: `./services/firebase/${
        target || 'dev'
      }/google-services.json`,
    },
  }
}
