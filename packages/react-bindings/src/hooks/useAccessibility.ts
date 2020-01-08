import { Accessibility, AccessibilityAttributesBySlot } from '@fluentui/accessibility'
import * as React from 'react'

import getAccessibility from '../accessibility/getAccessibility'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from '../accessibility/types'

type UseAccessibilityOptions<Props> = {
  actionHandlers?: AccessibilityActionHandlers
  debugName?: string
  mapPropsToBehavior?: () => Props
  rtl?: boolean
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

  const latestDefinition = React.useRef<ReactAccessibilityBehavior>(definition)
  latestDefinition.current = definition

  return React.useCallback(
    <SlotProps extends Record<string, any>>(slotName: string, slotProps: SlotProps) =>
      mergeProps(slotName, slotProps, latestDefinition.current),
    [],
  )
}

export default useAccessibility
