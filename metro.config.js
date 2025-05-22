const { getSentryExpoConfig } = require('@sentry/react-native/metro')

const config = getSentryExpoConfig(__dirname)

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true

module.exports = config
