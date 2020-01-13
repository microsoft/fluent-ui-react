import * as React from 'react'
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela'

import { ComponentSlotStyle, ComponentVariablesInput, emptyTheme } from '@fluentui/styles'
import { ComponentDesignProp, StylesContextValue } from '../styles/types'
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

  design?: ComponentDesignProp // TODO type

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<StyleProps, any> // TODO: see if we can improve it

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput
}

const useStyles = <StyleProps extends PrimitiveProps>(
  displayName: string,
  options: UseStylesOptions<StyleProps>,
): [GetStylesResult['classes'], GetStylesResult['styles']] => {
  const context: StylesContextValue = React.useContext(ThemeContext) || ({} as any) // TODO FIX ME
  const {
    className = 'no-classname-🙉',
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps<StyleProps>),
    rtl = false,
  } = options

  const { classes, styles: resolvedStyles } = getStyles({
    // Input values
    className,
    displayName,
    props: {
      ...mapPropsToStyles(),
      ...mapPropsToInlineStyles(),
    },

    // Context values
    disableAnimations: context.disableAnimations || false,
    renderer: context.renderer || { renderRule: () => '' },
    rtl,
    saveDebug: () => null,
    theme: context.theme || emptyTheme,
    _internal_resolvedComponentVariables: context._internal_resolvedComponentVariables || {},
  })

  return [classes, resolvedStyles]
}

export default useStyles
