export default ({ config }) => {
  const appName =
    process.env.TARGET === 'dev' ? `${config.appName} Dev` : config.appName
  return {
    ...config,
  }
}
