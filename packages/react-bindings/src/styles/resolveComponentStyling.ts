import {
  ComponentSlotClasses,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
} from '@stardust-ui/react'
import {
  mergeComponentStyles,
  mergeComponentVariables,
} from '@stardust-ui/react/src/lib/mergeThemes'
import createAnimationStyles from '@stardust-ui/react/src/lib/createAnimationStyles'
import callable from '@stardust-ui/react/src/lib/callable'
import cx from 'classnames'

const resolveComponentStyling = ({
  className,
  disableAnimations,
  displayName,
  props,
  renderer,
  rtl,
  theme,
}) => {
  // Resolve variables for this component, allow props.variables to override
  const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
    theme.componentVariables[displayName],
    props.variables,
  )(theme.siteVariables)

  const animationCSSProp = props.animation ? createAnimationStyles(props.animation, theme) : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    theme.componentStyles[displayName],
    { root: props.design },
    { root: props.styles },
    { root: animationCSSProp },
  )

  const styleParam: ComponentStyleFunctionParam = {
    displayName,
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
  }

  const resolvedStyles: ComponentSlotStylesPrepared = {}
  const classes: ComponentSlotClasses = {}

  Object.keys(mergedStyles).forEach(slotName => {
    resolvedStyles[slotName] = callable(mergedStyles[slotName])(styleParam)

    if (renderer) {
      classes[slotName] = renderer.renderRule(callable(resolvedStyles[slotName]), felaParam)
    }
  })

  classes.root = cx(className, classes.root, props.className)

  return [classes, resolvedStyles, resolvedVariables]
}

export default resolveComponentStyling
