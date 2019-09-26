const isDebugEnabled = () => {
  let enabled = false
  try {
    const isProduction = process.env.NODE_ENV === 'production'
    // eslint-disable-next-line no-undef
    const isEnabledBrowserOverride = !!window.localStorage.stardustDebug

    if (isEnabledBrowserOverride) {
      console.warn(
        [
          '@stardust-ui/react:',
          `Debug data collection is overriden to be enabled.`,
          'To remove this override paste `delete window.localStorage.stardustDebug` to your browser console and reload the page.',
        ].join(' '),
      )
    }

    enabled = isEnabledBrowserOverride || !isProduction
  } catch {}

  return enabled
}

export const isEnabled = isDebugEnabled()
