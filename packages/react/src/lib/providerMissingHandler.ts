import constants from './constants'

const warning = {
  message: `You probably forgot to use a 'Provider'. Check ${
    constants.quickStartUrl
  } for correct usage.`,
  wasLogged: false,
}

const logProviderMissingWarning = (): void => {
  if (!warning.wasLogged) {
    console.error(warning.message)
    warning.wasLogged = true
  }
}

export default logProviderMissingWarning
