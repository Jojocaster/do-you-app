import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  let appName

  //@ts-ignore
  switch (process.env.TARGET) {
    case 'dev':
      appName = `${config.name} Dev`
      break
    case 'preview':
      appName = `${config.name} Preview`
      break
    default:
      appName = config.name
  }

  return {
    ...config,
    name: appName,
    ios: {
      ...config.ios,
      bundleIdentifier:
        //@ts-ignore
        process.env.TARGET === 'dev'
          ? 'com.wonkylines.doyouworlddev'
          : 'com.wonkylines.doyouworld',
    },
    android: {
      ...config.android,
      package:
        //@ts-ignore
        process.env.TARGET === 'dev'
          ? 'com.wonkylines.doyouworlddev'
          : 'com.wonkylines.doyouworld',
    },
  }
}
