import { emptyTheme } from '@stardust-ui/react/src/lib/mergeThemes'
import { ThemeContext } from 'react-fela'

import resolveComponentStyling from '../styles/resolveComponentStyling'
import { ProviderContextPrepared } from '@stardust-ui/react'
import * as React from 'react'

const useStyles = (props, options) => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { className = 'undefined', displayName = 'StardustComponent' } = options
  const { disableAnimations = false, renderer = null, rtl = false, theme = emptyTheme } =
    context || {}

  return resolveComponentStyling({
    className,
    disableAnimations,
    displayName,
    props,
    rtl,
    renderer,
    theme,
  })
}

export default useStyles
