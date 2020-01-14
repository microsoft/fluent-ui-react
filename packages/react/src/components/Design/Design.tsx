import { ComponentDesignProp, RendererParam } from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { ProviderContextPrepared, ReactChildren } from '../../types'

export type DesignProps = {
  /** A render function that receives the generated className as its only argument */
  children: ({ className: string }) => ReactChildren

  /** Design config takes a limited set of layout and position CSS properties. */
  config: ComponentDesignProp
}

/**
 * The Design component provides a theme safe subset of CSS for designing layouts.
 */
function Design<DesignProps>({ config, children }) {
  const context = React.useContext<ProviderContextPrepared>(ThemeContext)
  const getConfig = React.useCallback(() => config, [config])

  // Heads Up! Keep in sync with renderComponent.tsx
  const styleParam: RendererParam = {
    displayName: Design.displayName,
    disableAnimations: context.disableAnimations,
    theme: { direction: context.rtl ? 'rtl' : 'ltr' },
  }

  const className = context.renderer.renderRule(getConfig, styleParam)

  return children({ className })
}

Design.displayName = 'Design'

Design.propTypes = {
  children: PropTypes.func.isRequired,

  config: customPropTypes.design.isRequired,
}

export default Design
