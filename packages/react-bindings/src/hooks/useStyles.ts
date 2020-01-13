import {
  ComponentSlotStyle,
  ComponentVariablesInput,
  DebugData,
  emptyTheme,
} from '@fluentui/styles'
import * as React from 'react'
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela'

import { ComponentDesignProp, RendererRenderRule, StylesContextValue } from '../styles/types'
import getStyles, { GetStylesResult } from '../styles/getStyles'

type PrimitiveProps = Record<string, boolean | number | string | undefined>
type UseStylesOptions<StyleProps extends PrimitiveProps> = {
  className?: string
  mapPropsToStyles?: () => StyleProps
  mapPropsToInlineStyles?: () => InlineStyleProps<StyleProps>
  rtl?: boolean
}

type InlineStyleProps<StyleProps> = {
  /** Additional CSS class name(s) to apply.  */
  className?: string

  design?: ComponentDesignProp

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<StyleProps, any> // TODO: see if we can improve it

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput
}

const defaultContext: StylesContextValue<{ renderRule: RendererRenderRule }> = {
  disableAnimations: false,
  renderer: { renderRule: () => '' },
  theme: emptyTheme,
  _internal_resolvedComponentVariables: {},
}

const useStyles = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): [GetStylesResult['classes'], GetStylesResult['styles']] => {
  const context: StylesContextValue<{ renderRule: RendererRenderRule }> =
    React.useContext(ThemeContext) || defaultContext

  const {
    className = 'no-classname-🙉',
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<StyleProps>),
    rtl = false,
  } = options

  // Stores debug information for component.
  const debug = React.useRef<{ fluentUIDebug: DebugData | null }>({ fluentUIDebug: null })
  const { classes, styles: resolvedStyles } = getStyles({
    // Input values
    className,
    displayName,
    props: {
      ...mapPropsToStyles(),
      ...mapPropsToInlineStyles(),
    },

    // Context values
    disableAnimations: context.disableAnimations,
    renderer: context.renderer,
    rtl,
    saveDebug: fluentUIDebug => (debug.current = { fluentUIDebug }),
    theme: context.theme,
    _internal_resolvedComponentVariables: context._internal_resolvedComponentVariables,
  })

  return [classes, resolvedStyles]
}

export default useStyles
