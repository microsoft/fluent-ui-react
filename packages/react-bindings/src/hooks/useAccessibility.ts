import { Accessibility, AccessibilityAttributesBySlot } from '@stardust-ui/accessibility'
import * as React from 'react'

import getAccessibility from '../accessibility/getAccessibility'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from '../accessibility/types'

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers
  debugName?: string
  mapPropsToBehavior?: () => Props
  rtl?: boolean
}

const mergeProps = <SlotProps extends Record<string, any>>(
  slotName: string,
  slotProps: SlotProps,
  definition: ReactAccessibilityBehavior,
): SlotProps & Partial<AccessibilityAttributesBySlot> => {
  const finalProps = {
    ...definition.attributes[slotName],
    ...slotProps,
  }
  const slotHandlers = definition.keyHandlers[slotName]

  if (slotHandlers) {
    const onKeyDown = (e: React.KeyboardEvent, ...args: any[]) => {
      definition.keyHandlers[slotName].onKeyDown(e)
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

  const latestDefinition = React.useRef<ReactAccessibilityBehavior>(definition)
  latestDefinition.current = definition

  return React.useCallback(
    <SlotProps extends Record<string, any>>(slotName: string, slotProps: SlotProps) =>
      mergeProps(slotName, slotProps, latestDefinition.current),
    [],
  )
}

export default useAccessibility
