import {
  AccessibilityDefinition,
  FocusZoneMode,
  FocusZoneDefinition,
  Accessibility,
} from '@stardust-ui/accessibility'
import {
  callable,
  FocusZone,
  FocusZoneProps,
  FOCUSZONE_WRAP_ATTRIBUTE,
  getElementType,
  getUnhandledProps,
} from '@stardust-ui/react-bindings'
import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

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
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from './accessibility/reactTypes'
import getKeyDownHandlers from './getKeyDownHandlers'
import { emptyTheme, mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import createAnimationStyles from './createAnimationStyles'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'
import { DebugData } from './debug/debugData'
import withDebugId from './withDebugId'
import Telemetry from './Telemetry'
import resolveStylesAndClasses from './resolveStylesAndClasses'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
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
  state: State
  actionHandlers: AccessibilityActionHandlers
  render: RenderComponentCallback<P>
  saveDebug: (debug: DebugData | null) => void
}

const emptyBehavior: ReactAccessibilityBehavior = {
  attributes: {},
  keyHandlers: {},
}

const getAccessibility = (
  displayName: string,
  props: State & PropsWithVarsAndStyles & { accessibility?: Accessibility },
  actionHandlers: AccessibilityActionHandlers,
  isRtlEnabled: boolean,
): ReactAccessibilityBehavior => {
  const { accessibility } = props

  if (_.isNil(accessibility)) {
    return emptyBehavior
  }

  const definition: AccessibilityDefinition = accessibility(props)
  const keyHandlers = getKeyDownHandlers(actionHandlers, definition.keyActions, isRtlEnabled)

  if (process.env.NODE_ENV !== 'production') {
    // For the non-production builds we enable the runtime accessibility attributes validator.
    // We're adding the data-aa-class attribute which is being consumed by the validator, the
    // schema is located in @stardust-ui/ability-attributes package.
    if (definition.attributes) {
      const slotNames = Object.keys(definition.attributes)
      slotNames.forEach(slotName => {
        if (!definition.attributes[slotName]) {
          definition.attributes[slotName] = {}
        }

        const slotAttributes = definition.attributes[slotName]
        if (!('data-aa-class' in slotAttributes)) {
          definition.attributes[slotName]['data-aa-class'] = `${displayName}${
            slotName === 'root' ? '' : `__${slotName}`
          }`
        }
      })
    }
  }

  return {
    ...emptyBehavior,
    ...definition,
    keyHandlers,
  }
}

/**
 * This function provides compile-time type checking for the following:
 * - if FocusZone implements FocusZone interface,
 * - if FocusZone properties extend FocusZoneProps, and
 * - if the passed properties extend FocusZoneProps.
 *
 * Should the FocusZone implementation change at any time, this function should provide a compile-time guarantee
 * that the new implementation is backwards compatible with the old implementation.
 */
function wrapInGenericFocusZone<
  COMPONENT_PROPS extends FocusZoneProps,
  PROPS extends COMPONENT_PROPS,
  COMPONENT extends FocusZone & React.Component<COMPONENT_PROPS>
>(
  FocusZone: { new (...args: any[]): COMPONENT },
  props: PROPS | undefined,
  children: React.ReactNode,
) {
  props[FOCUSZONE_WRAP_ATTRIBUTE] = true
  return <FocusZone {...props}>{children}</FocusZone>
}

const renderWithFocusZone = <P extends {}>(
  render: RenderComponentCallback<P>,
  focusZoneDefinition: FocusZoneDefinition,
  config: RenderResultConfig<P>,
): any => {
  if (focusZoneDefinition.mode === FocusZoneMode.Wrap) {
    return wrapInGenericFocusZone(
      FocusZone,
      {
        ...focusZoneDefinition.props,
        isRtl: config.rtl,
      },
      render(config),
    )
  }
  if (focusZoneDefinition.mode === FocusZoneMode.Embed) {
    const originalElementType = config.ElementType
    config.ElementType = FocusZone as any
    config.unhandledProps = { ...config.unhandledProps, ...focusZoneDefinition.props }
    config.unhandledProps.as = originalElementType
    config.unhandledProps.isRtl = config.rtl
  }
  return render(config)
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

  const {
    disableAnimations = false,
    renderer = null,
    rtl = false,
    theme = emptyTheme,
    telemetry = undefined as Telemetry,
    _internal_resolvedComponentVariables: resolvedComponentVariables = {},
    _internal_resolvedComponentStyles: resolvedComponentStyles = {},
  } = context || {}

  const startTime = telemetry && telemetry.enabled ? performance.now() : 0

  const ElementType = getElementType(props) as React.ReactType<P>
  const stateAndProps = { ...state, ...props }
  let variablesUpdated = false
  // Resolve variables for this component, cache the result in provider
  if (!resolvedComponentVariables[displayName]) {
    variablesUpdated = true
    resolvedComponentVariables[displayName] =
      callable(theme.componentVariables[displayName])(theme.siteVariables) || {} // component variables must not be undefined/null (see mergeComponentVariables contract)
  }

  // Merge inline variables on top of cached variables
  const resolvedVariables = props.variables
    ? mergeComponentVariables(
        resolvedComponentVariables[displayName],
        withDebugId(props.variables, 'props.variables'),
      )(theme.siteVariables)
    : resolvedComponentVariables[displayName]

  const animationCSSProp = props.animation
    ? createAnimationStyles(props.animation, context.theme)
    : {}

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    displayName,
    stateAndProps,
    actionHandlers,
    rtl,
  )

  const unhandledProps = getUnhandledProps(handledProps, props)

  const styleParam: ComponentStyleFunctionParam = {
    displayName,
    props: stateAndProps,
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

  let classes: ComponentSlotClasses = {}
  let resolvedStyles: ComponentSlotStylesPrepared = {}
  let resolvedStylesDebug: { [key: string]: { styles: Object }[] } = {}

  if (!(theme.componentSelectorStyles && theme.componentSelectorStyles[displayName])) {
    // Resolve styles using resolved variables, merge results, allow props.styles to override
    const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
      theme.componentStyles[displayName],
      withDebugId({ root: props.design }, 'props.design'),
      withDebugId({ root: props.styles }, 'props.styles'),
      withDebugId({ root: animationCSSProp }, 'props.animation'),
    )

    // Object.keys(mergedStyles).forEach(slotName => {
    //   resolvedStyles[slotName] = callable(mergedStyles[slotName])(styleParam)

    //   if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
    //     resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
    //     delete resolvedStyles[slotName]['_debug']
    //   }

    //   if (renderer) {
    //     classes[slotName] = renderer.renderRule(callable(resolvedStyles[slotName]), felaParam)
    //   }
    // })

    // classes.root = cx(className, classes.root, props.className)
    const result = resolveStylesAndClasses(
      mergedStyles,
      styleParam,
      renderer ? style => renderer.renderRule(() => style, felaParam) : undefined,
    )

    classes = result.classes
    resolvedStyles = result.resolvedStyles
    resolvedStylesDebug = result.resolvedStylesDebug
  }

  if (
    (!resolvedComponentStyles[displayName] || variablesUpdated) &&
    theme.componentSelectorStyles &&
    theme.componentSelectorStyles[displayName]
  ) {
    resolvedComponentStyles[displayName] = true // add flag that the styles were written in the head
    const rules = theme.componentSelectorStyles[displayName](resolvedVariables)
    const selectorObjectToCssSelector = (obj, baseClassName) => {
      let cssSelector = baseClassName || ''
      Object.keys(obj).forEach(key => {
        if (obj[key] === true) {
          cssSelector += `.${key}`
        } else if (obj[key] === false) {
          cssSelector += `:not(.${key})`
        } else {
          cssSelector += `.${key}--${obj[key]}`
        }
      })
      return cssSelector
    }

    const generateStylesheetObject = (rules, base) => {
      return Object.keys(rules).reduce((accR, next) => {
        const tuples = rules[next]
        const baseClassName = next === 'root' ? base : `${base}__${next}`
        const result = tuples.reduce((acc, [selector, style]) => {
          if (Array.isArray(selector)) {
            for (let i = 0; i < selector.length; i++) {
              acc[selectorObjectToCssSelector(selector[i] || {}, baseClassName)] = {
                ...style,
                className: selectorObjectToCssSelector(selector[i] || {}, baseClassName),
              }
            }
            return acc
          }
          acc[selectorObjectToCssSelector(selector || {}, baseClassName)] = {
            ...style,
            className: selectorObjectToCssSelector(selector || {}, baseClassName),
          }
          return acc
        }, {})
        accR[next] = result
        return accR
      }, {})
    }

    // TODO: fix className resolution
    let baseClassName =
      displayName === 'Menu'
        ? 'ui-menu'
        : displayName === 'MenuItem'
        ? 'ui-menu__item'
        : 'ui-menu__divider'

    if (theme.name) {
      baseClassName = `${theme.name}.${baseClassName}`
    }
    const stylesheet = generateStylesheetObject(rules, baseClassName)

    Object.keys(stylesheet).forEach(slot => {
      Object.keys(stylesheet[slot]).forEach(selector => {
        renderer.renderRule(() => stylesheet[slot][selector], felaParam)
      })
    })

    const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
      withDebugId({ root: props.design }, 'props.design'),
      withDebugId({ root: props.styles }, 'props.styles'),
      withDebugId({ root: animationCSSProp }, 'props.animation'),
    )

    resolvedStyles['root'] = callable(mergedStyles['root'])(styleParam)
    classes['root'] = renderer.renderRule(callable(resolvedStyles['root']), felaParam)
    classes.root = cx(className, classes.root, props.className)
  }

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    accessibility,
    rtl,
    theme,
  }

  let result
  if (accessibility.focusZone) {
    result = renderWithFocusZone(render, accessibility.focusZone, resolvedConfig)
  } else {
    result = render(resolvedConfig)
  }

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

  if (telemetry && telemetry.enabled) {
    const duration = performance.now() - startTime

    if (telemetry.performance[displayName]) {
      telemetry.performance[displayName].count++
      telemetry.performance[displayName].msTotal += duration
      telemetry.performance[displayName].msMin = Math.min(
        duration,
        telemetry.performance[displayName].msMin,
      )
      telemetry.performance[displayName].msMax = Math.max(
        duration,
        telemetry.performance[displayName].msMax,
      )
    } else {
      telemetry.performance[displayName] = {
        count: 1,
        msTotal: duration,
        msMin: duration,
        msMax: duration,
      }
    }
  }

  return result
}

export default renderComponent
