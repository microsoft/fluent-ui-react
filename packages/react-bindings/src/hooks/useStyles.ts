import cx from 'classnames'
import * as React from 'react'
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela'

import {
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  emptyTheme,
  mergeComponentStyles,
  mergeComponentVariables,
} from '@fluentui/styles'
import { ProviderContextPrepared } from '@fluentui/react'
import resolveStylesAndClasses from '../styles/resolveStylesAndClasses'

type UseStylesOptions<StyleProps> = {
  className?: string
  mapPropsToStyles?: () => StyleProps
  mapPropsToInlineStyles?: () => InlineStyleProps // Consider better name
  rtl?: boolean
}

type InlineStyleProps = {
  className?: string
  design?: any // TODO type
  styles?: any // TODO type
  variables?: any // TODO type
}

const useStyles = <StyleProps>(
  displayName: string | string[],
  options: UseStylesOptions<StyleProps>,
) => {
  const {
    className = 'no-classname-🙉',
    mapPropsToStyles = () => ({} as StyleProps),
    mapPropsToInlineStyles = () => ({} as InlineStyleProps),
    rtl = false,
  } = options

  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { disableAnimations = false, renderer = null, theme = emptyTheme } = context || {}

  // TODO: throw if there is no context

  const props = mapPropsToStyles()
  const { className: userClassName, styles, design, variables } = mapPropsToInlineStyles()

  const componentVariables = Array.isArray(displayName)
    ? displayName.map(displayName => theme.componentVariables[displayName])
    : [theme.componentVariables[displayName]]
  const componentStyles = Array.isArray(displayName)
    ? displayName.map(displayName => theme.componentStyles[displayName])
    : [theme.componentStyles[displayName]]

  // Merge inline variables on top of cached variables
  const resolvedVariables = mergeComponentVariables(
    ...componentVariables,
    variables,
  )(theme.siteVariables)

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    ...componentStyles,
    { root: design },
    { root: styles },
  )

  const styleParam: ComponentStyleFunctionParam = {
    displayName: Array.isArray(displayName) ? displayName[0] : displayName,
    props,
    variables: resolvedVariables,
    theme,
    rtl,
    disableAnimations,
  }

  // Fela plugins rely on `direction` param in `theme` prop instead of RTL
  // Our API should be aligned with it
  // Heads Up! Keep in sync with Design.tsx render logic
  const direction = rtl ? 'rtl' : 'ltr'
  const felaParam = {
    theme: { direction },
    disableAnimations,
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const { resolvedStyles, classes } = resolveStylesAndClasses(
    mergedStyles,
    styleParam,
    // @ts-ignore
    renderer ? style => renderer.renderRule(() => style, felaParam) : undefined,
  )

  classes.root = cx(className, classes.root, userClassName)

  return [classes, resolvedStyles]
}

export default useStyles
