import {
  Accessibility,
  AccessibilityDefinition,
  FocusZoneDefinition,
  FocusZoneMode,
} from '@stardust-ui/accessibility'
import {
  FocusZone,
  FOCUSZONE_WRAP_ATTRIBUTE,
  FocusZoneProps,
  getElementType,
  getUnhandledProps,
} from '@stardust-ui/react-bindings'
import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

import logProviderMissingWarning from './providerMissingHandler'
import {
  ComponentSlotClasses,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  ICSSInJSStyle,
  PropsWithVarsAndStyles,
  State,
  ThemePrepared,
} from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import { AccessibilityActionHandlers, ReactAccessibilityBehavior } from './accessibility/reactTypes'
import getKeyDownHandlers from './getKeyDownHandlers'
import { emptyTheme, mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import createAnimationStyles from './createAnimationStyles'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'
import { DebugData } from './debug/debugData'
import withDebugId from './withDebugId'
import Telemetry from './Telemetry'

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

        definition.attributes[slotName]['data-aa-class'] = `${displayName}${
          slotName === 'root' ? '' : `__${slotName}`
        }`
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
  } = context || {}

  const startTime = telemetry && telemetry.enabled ? performance.now() : 0

  const ElementType = getElementType(props) as React.ReactType<P>
  const stateAndProps = { ...state, ...props }

  // Resolve variables for this component, cache the result in provider
  if (!resolvedComponentVariables[displayName]) {
    resolvedComponentVariables[displayName] = theme.componentVariables[displayName]
      ? theme.componentVariables[displayName](theme.siteVariables)
      : {} // component variables must not be undefined/null (see mergeComponentVariables contract)
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

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    theme.componentStyles[displayName],
    withDebugId({ root: props.design }, 'props.design'),
    withDebugId({ root: props.styles }, 'props.styles'),
    withDebugId({ root: animationCSSProp }, 'props.animation'),
  )

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
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const resolvedStyles: ICSSInJSStyle = {}
  const resolvedStylesDebug: { [key: string]: { styles: Object }[] } = {}
  const classes: ComponentSlotClasses = {}

  // const debug = (...args) => displayName !== 'ProviderBox' && console.debug(displayName, ...args)

  const slots = []
  const computedStyles = []
  const cachedStyles = []
  const computedClasses = []
  const cachedClasses = []

  Object.keys(mergedStyles).forEach(slotName => {
    slots.push(slotName)
    // resolve/render slot styles once and cache
    const cacheKey = `${slotName}__return`

    Object.defineProperty(resolvedStyles, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        resolvedStyles[cacheKey] = val
        // debug('SET STYLE', slotName, val)
        return true
      },
      get() {
        if (resolvedStyles[cacheKey]) {
          // debug('=> CACHED STYLE', slotName)
          cachedStyles.push(slotName)
          return resolvedStyles[cacheKey]
        }

        // debug('NOT CACHED STYLE', slotName)
        // resolve/render slot styles once and cache
        resolvedStyles[cacheKey] = mergedStyles[slotName](styleParam)

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
          delete resolvedStyles[slotName]['_debug']
        }

        // debug('=> COMPUTED STYLE', slotName)
        computedStyles.push(slotName)
        return resolvedStyles[cacheKey]
      },
    })

    Object.defineProperty(classes, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        classes[cacheKey] = val
        // debug('SET CLASS', slotName, val)
        return true
      },
      get() {
        if (classes[cacheKey]) {
          // debug('=> CACHED CLASS', slotName)
          cachedClasses.push(slotName)
          return classes[cacheKey]
        }

        // debug('NOT CACHED CLASS', slotName)
        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName]

        // fela throws on returning undefined, always return object
        if (renderer && styleObj) {
          // debug('...RENDER CLASSES TO HEAD')
          computedClasses.push(slotName)
          classes[cacheKey] = renderer.renderRule(() => styleObj, felaParam)
        }

        // debug('=> COMPUTED CLASS', slotName)
        return classes[cacheKey]
      },
    })
  })

  classes.root = cx(className, classes.root, props.className)

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
      componentStyles: _.mapValues(resolvedStylesDebug, v =>
        _.filter(v, v => {
          return !_.isEmpty(v.styles)
        }),
      ),
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
      telemetry.performance[displayName]['all'].push(duration)
    } else {
      telemetry.performance[displayName] = {
        count: 1,
        msTotal: duration,
        msMin: duration,
        msMax: duration,
        all: [duration],
      }
    }
  }

  // LOG AFTER render, so lazy styles/vars can be evaluated and counted
  // debug(displayName, {
  //   slots,
  //   computedStyles,
  //   cachedStyles,
  //   computedClasses,
  //   cachedClasses,
  // })

  return result
}

export default renderComponent
