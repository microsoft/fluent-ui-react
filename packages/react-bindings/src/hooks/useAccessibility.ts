import { Accessibility, AccessibilityAttributesBySlot } from '@fluentui/accessibility'
import * as React from 'react'

import getAccessibility from '../accessibility/getAccessibility'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from '../accessibility/types'
import FocusZone from '../FocusZone/FocusZone'

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers
  debugName?: string
  mapPropsToBehavior?: () => Props
  rtl?: boolean
}

type UseAccessibilityResult = (<SlotProps extends Record<string, any>>(
  slotName: string,
  slotProps: SlotProps,
) => MergedProps<SlotProps>) & {
  unstable_withFocusZone: (children: React.ReactElement) => React.ReactElement
}

type MergedProps<SlotProps extends Record<string, any>> = SlotProps &
  Partial<AccessibilityAttributesBySlot> & {
    onKeyDown?: (e: React.KeyboardEvent, ...args: any[]) => void
  }

const mergeProps = <SlotProps extends Record<string, any>>(
  slotName: string,
  slotProps: SlotProps,
  definition: ReactAccessibilityBehavior,
): MergedProps<SlotProps> => {
  const finalProps: MergedProps<SlotProps> = {
    ...definition.attributes[slotName],
    ...slotProps,
  }
  const slotHandlers = definition.keyHandlers[slotName]

  if (slotHandlers) {
    const onKeyDown = (e: React.KeyboardEvent, ...args: any[]) => {
      if (slotHandlers && slotHandlers.onKeyDown) {
        slotHandlers.onKeyDown(e)
      }

      if (slotProps.onKeyDown) {
        slotProps.onKeyDown(e, ...args)
      }
    }

    finalProps.onKeyDown = onKeyDown
  }

  return finalProps
}

const useAccessibility = <Props>(
  behavior: Accessibility<Props>,
  options: UseAccessibilityOptions<Props> = {},
) => {
  const {
    actionHandlers,
    debugName = 'Undefined',
    mapPropsToBehavior = () => ({}),
    rtl = false,
  } = options
  const definition = getAccessibility(
    debugName,
    behavior,
    mapPropsToBehavior(),
    rtl,
    actionHandlers,
  )

  const getA11Props: UseAccessibilityResult = (slotName, slotProps) =>
    mergeProps(slotName, slotProps, definition)

  // Provides an experimental handling for FocusZone definition in behaviors
  getA11Props.unstable_withFocusZone = (children: React.ReactElement) => {
    if (definition.focusZone) {
      let element: React.ReactElement = children

      if (process.env.NODE_ENV !== 'production') {
        element = React.Children.only(children)
      }

      return React.createElement(FocusZone, {
        ...definition.focusZone.props,
        ...element.props,
        as: element.type,
        isRtl: rtl,
      })
    }

    return children
  }

  return getA11Props
}

export default useAccessibility
