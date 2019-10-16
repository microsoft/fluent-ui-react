const isDebugEnabled = () => {
  let enabled = false
  if (process.env.NODE_ENV !== 'production') {
    try {
      // eslint-disable-next-line no-undef
      const stardustDebugEnabled = !!window.localStorage.stardustDebug

      if (process.env.NODE_ENV !== 'test') {
        if (stardustDebugEnabled) {
          /* eslint-disable-next-line no-console */
          console.warn(
            [
              '@stardust-ui/react:',
              `CSSinJS Debug data collection is enabled.`,
              'To remove this override paste `delete window.localStorage.stardustDebug` to your browser console and reload the page.',
            ].join(' '),
          )
        } else {
          /* eslint-disable-next-line no-console */
          console.warn(
            [
              '@stardust-ui/react:',
              `CSSinJS Debug data collection is disabled.`,
              'To enable data collection paste `window.localStorage.stardustDebug = true` to your browser console and reload the page.',
            ].join(' '),
          )
        }
      }

      enabled = stardustDebugEnabled
    } catch {}
  }

  return enabled
}

export const isEnabled = isDebugEnabled()
