const ENV = {
  API_URL: {
    dev: 'https://4xgidh9spl.execute-api.eu-west-2.amazonaws.com',
    prod: 'https://us7wjtwtug.execute-api.eu-west-2.amazonaws.com',
  },
}

export const getEnv = (key: keyof typeof ENV) => {
  const environment = __DEV__ ? 'dev' : 'prod'
  return ENV[key][environment]
}
