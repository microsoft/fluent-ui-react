import {
  AccessibilityActionHandlers,
  ComponentSlotClasses,
  FocusZone,
  getElementType,
  getUnhandledProps,
  ReactAccessibilityBehavior,
  unstable_getAccessibility as getAccessibility,
  unstable_getStyles as getStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import {
  emptyTheme,
  ComponentSlotStylesResolved,
  ComponentVariablesObject,
  DebugData,
  PropsWithVarsAndStyles,
  ThemePrepared,
} from '@fluentui/styles'
import * as _ from 'lodash'
import * as React from 'react'

import { Props, ProviderContextPrepared } from '../types'
import logProviderMissingWarning from './providerMissingHandler'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesResolved
  accessibility: ReactAccessibilityBehavior
  rtl: boolean
  theme: ThemePrepared
}

export type RenderComponentCallback<P> = (config: RenderResultConfig<P>) => any

export interface RenderConfig<P> {
  className?: string
  displayName: string
  handledProps: string[]
  props: PropsWithVarsAndStyles
  state: Record<string, any>
  actionHandlers: AccessibilityActionHandlers
  render: RenderComponentCallback<P>
  saveDebug: (debug: DebugData | null) => void
}

const renderComponent = <P extends {}>(
  config: RenderConfig<P>,
  context?: ProviderContextPrepared,
): React.ReactElement<P> => {
  const {
    className,
    displayName,
    handledProps,
    props,
    state,
    actionHandlers,
    render,
    saveDebug = () => {},
  } = config

  if (_.isEmpty(context)) {
    logProviderMissingWarning()
  }

  const { setStart, setEnd } = useTelemetry(displayName, context.telemetry)
  const rtl = context.rtl || false

  setStart()

  const ElementType = getElementType(props) as React.ReactType<P>
  const unhandledProps = getUnhandledProps(handledProps, props)
  const stateAndProps = { ...state, ...props }

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    displayName,
    props.accessibility,
    stateAndProps,
    rtl,
    actionHandlers,
  )
  const { classes, variables, styles, theme } = getStyles({
    className,
    disableAnimations: context.disableAnimations || false,
    displayName,
    props: stateAndProps,
    renderer: context.renderer || { renderRule: () => '' },
    rtl,
    saveDebug,
    theme: context.theme || emptyTheme,
    performance: {
      ...context.performance,
      enableStylesCaching: false, // we cannot enable caching for class components
    },
  })

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables,
    styles,
    accessibility,
    rtl,
    theme,
  }

  if (accessibility.focusZone) {
    const originalElementType = resolvedConfig.ElementType

    resolvedConfig.ElementType = FocusZone as any
    resolvedConfig.unhandledProps = {
      ...resolvedConfig.unhandledProps,
      ...accessibility.focusZone.props,
    }
    resolvedConfig.unhandledProps.as = originalElementType
    resolvedConfig.unhandledProps.isRtl = resolvedConfig.rtl
  }

  const element = render(resolvedConfig)
  setEnd()

  return element
}

export default renderComponent
