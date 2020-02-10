import {
  ComponentSlotStylesResolved,
  ComponentVariablesObject,
  DebugData,
  isDebugEnabled,
  PropsWithVarsAndStyles,
} from '@fluentui/styles'
import cx from 'classnames'
import * as _ from 'lodash'

import {
  ComponentDesignProp,
  ComponentSlotClasses,
  RendererRenderRule,
  StylesContextValue,
} from '../styles/types'
import resolveVariables from './resolveVariables'
import resolveStyles from './resolveStyles'

type GetStylesOptions = StylesContextValue<{
  renderRule: RendererRenderRule
}> & {
  className?: string
  displayName: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  rtl: boolean
  saveDebug: (debug: DebugData | null) => void
}

export type GetStylesResult = {
  classes: ComponentSlotClasses
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesResolved
  theme: StylesContextValue['theme']
}

const getStyles = (options: GetStylesOptions): GetStylesResult => {
  const {
    className: componentClassName,
    disableAnimations,
    displayName,
    props,
    renderer,
    rtl,
    saveDebug,
    theme,
    performance,
  } = options

  const { enableStylesCaching, enableVariablesCaching } = performance
  const { className, design, styles, variables, ...restProps } = props

  //
  // To compute styles we are going through three stages:
  // - resolve variables (siteVariables => componentVariables + props.variables)
  // - resolve styles (with resolvedVariables & props.styles & props.design)
  // - compute classes (with resolvedStyles)
  // - conditionally add sources for evaluating debug information to component

  const resolvedVariables = resolveVariables(
    displayName,
    theme,
    props.variables,
    enableVariablesCaching,
  )

  const noInlineOverrides = !(design || styles || variables)

  const { classes, resolvedStyles, resolvedStylesDebug } = resolveStyles({
    theme,
    displayName,
    disableAnimations,
    rtl,
    renderer,
    props,
    resolvedVariables,
    cacheEnabled: enableStylesCaching && noInlineOverrides,
    stylesProps: restProps,
  })

  // conditionally add sources for evaluating debug information to component
  if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
    saveDebug({
      componentName: displayName,
      componentVariables: _.filter(
        resolvedVariables._debug,
        variables => !_.isEmpty(variables.resolved),
      ),
      componentStyles: resolvedStylesDebug,
      siteVariables: _.filter(theme.siteVariables._debug, siteVars => {
        if (_.isEmpty(siteVars) || _.isEmpty(siteVars.resolved)) {
          return false
        }

        const keys = Object.keys(siteVars.resolved)
        if (
          keys.length === 1 &&
          keys.pop() === 'fontSizes' &&
          _.isEmpty(siteVars.resolved['fontSizes'])
        ) {
          return false
        }

        return true
      }),
    })
  }

  classes.root = cx(componentClassName, classes.__root, className)

  return {
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    theme,
  }
}

export default getStyles
