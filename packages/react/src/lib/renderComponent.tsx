import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

import callable from './callable'
import felaRenderer from './felaRenderer'
import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import logProviderMissingWarning from './providerMissingHandler'
import {
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  ComponentSlotClasses,
  ComponentSlotStylesPrepared,
  PropsWithVarsAndStyles,
  State,
  ThemePrepared,
} from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import { FocusZoneMode } from './accessibility/types'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from './accessibility/reactTypes'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import { FocusZone } from './accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './accessibility/FocusZone/focusUtilities'
import createAnimationStyles from './createAnimationStyles'
import getAccessibility from './accessibility/getAccessibility'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
  accessibility: ReactAccessibilityBehavior
  rtl: boolean
  theme: ThemePrepared
  wrap: RenderComponentCallback<P>
}

// TODO: can we rename?
export type RenderComponentCallback<P> = (
  children: React.ReactNode | React.ReactNodeArray,
) => React.ReactElement<P>

export interface RenderConfig<P> {
  className?: string
  displayName: string
  handledProps?: string[]
  props: PropsWithVarsAndStyles
  state: State
  actionHandlers?: AccessibilityActionHandlers
  context: ProviderContextPrepared
}

const renderComponent = <P extends {}>(config: RenderConfig<P>): RenderResultConfig<P> => {
  const { className, displayName, handledProps, props, state, actionHandlers, context } = config

  if (_.isEmpty(context)) {
    logProviderMissingWarning()
  }

  const { rtl = false, renderer = felaRenderer, disableAnimations = false } = context || {}

  const {
    siteVariables = {
      fontSizes: {},
    },
    componentVariables = {},
    componentStyles = {},
  } = (context.theme as ThemePrepared) || {}

  const ElementType = getElementType(props) as React.ReactType<P>

  const stateAndProps = { ...state, ...props }

  // TODO: fix bug with merging theme A on top of theme B when theme B's variables function references values missing in theme A's site variables.
  // CONCLUSION: use flat variables in site vars and component vars
  //   - bugs are from shallow merging deeply nested vars
  //   - it is confusing and inconsistent to sometimes deep merge and sometimes not
  //   - flat structure will align properly with style-dictionary format
  //   - this doesn't solve all problems, we need to know how to replace all "red" colors for instance in a merge operation
  // Resolve variables for this component, allow props.variables to override
  const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
    componentVariables[displayName],
    props.variables,
  )(siteVariables)

  const animationCSSProp = props.animation
    ? createAnimationStyles(props.animation, context.theme)
    : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    componentStyles[displayName],
    { root: props.styles },
    { root: animationCSSProp },
  )

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    props.accessibility,
    stateAndProps,
    actionHandlers,
    rtl,
  )

  const unhandledProps = getUnhandledProps(handledProps, props)

  const styleParam: ComponentStyleFunctionParam = {
    props: stateAndProps,
    variables: resolvedVariables,
    theme: context.theme,
    rtl,
    disableAnimations,
  }

  // TODO: This operation should be pulled into a "resolveStyles" function
  // doing this work can be brittle and duplicated unnecessarily.
  const resolvedStyles: ComponentSlotStylesPrepared = Object.keys(mergedStyles).reduce(
    (slots, slot) => ({ ...slots, [slot]: callable(mergedStyles[slot])(styleParam) }),
    {},
  )

  // TODO: this should probably take in resolved styles and not know about style functions and style param.
  // currently, it is using implementation knowledge of style functions and param to resolve styles.
  // it is also duplicating this work with "resolvedStyles" above. we are executing all styles 2x for all components on all renders :/ ...
  const classes: ComponentSlotClasses = getClasses(renderer, mergedStyles, styleParam)
  classes.root = cx(className, classes.root, props.className)

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    accessibility,
    rtl,
    theme: context.theme,
    wrap: (element: React.ReactElement<P>) => element,
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Wrap) {
    resolvedConfig.wrap = children => (
      <FocusZone
        isRtl={resolvedConfig.rtl}
        {...accessibility.focusZone.props}
        {...{ [FOCUSZONE_WRAP_ATTRIBUTE]: true }}
      >
        {children}
      </FocusZone>
    )
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Embed) {
    const originalElementType = resolvedConfig.ElementType
    resolvedConfig.ElementType = FocusZone as any
    resolvedConfig.unhandledProps = {
      ...resolvedConfig.unhandledProps,
      ...accessibility.focusZone.props,
    }
    resolvedConfig.unhandledProps.as = originalElementType
    resolvedConfig.unhandledProps.isRtl = resolvedConfig.rtl
  }

  return resolvedConfig
}

export default renderComponent
