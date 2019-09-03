// @ts-ignore
import { ThemeContext } from '@stardust-ui/react-fela'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { ProviderContextPrepared, ReactChildren } from '../../types'
import { ComponentDesign } from '../../themes/types'
import * as customPropTypes from '@stardust-ui/react-proptypes'

export type DesignProps = {
  /** A render function that receives the generated className as its only argument */
  children: ({ className: string }) => ReactChildren

  /** Design config takes a limited set of layout and position CSS properties. */
  config: ComponentDesign
}

/**
 * The Design component provides a theme safe subset of CSS for designing layouts.
 */
function Design<DesignProps>({ config, children }) {
  const theme = React.useContext<ProviderContextPrepared>(ThemeContext)
  const getConfig = React.useCallback(() => config, [config])

  // Heads Up! Keep in sync with getClasses.ts
  const styleParam = {
    theme: { direction: theme.rtl ? 'rtl' : 'ltr' },
  }

  const className = theme.renderer.renderRule(getConfig, styleParam)

  return children({ className })
}

Design.displayName = 'Design'

Design.propTypes = {
  children: PropTypes.func.isRequired,

  config: customPropTypes.design.isRequired,
}

export default Design
