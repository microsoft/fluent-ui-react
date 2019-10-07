import { Accessibility, AccessibilityDefinition } from '@stardust-ui/accessibility'

import getKeyDownHandlers from './getKeyDownHandlers'
import { AccessibilityActionHandlers, ReactAccessibilityBehavior } from './types'

const emptyBehavior: ReactAccessibilityBehavior = {
  attributes: {},
  keyHandlers: {},
}

const getAccessibility = <Props extends Record<string, any>>(
  displayName: string,
  behavior: Accessibility<Props>,
  behaviorProps: Props,
  isRtlEnabled: boolean,
  actionHandlers?: AccessibilityActionHandlers,
): ReactAccessibilityBehavior => {
  if (behavior === null || behavior === undefined) {
    return emptyBehavior
  }

  const definition: AccessibilityDefinition = behavior(behaviorProps)
  const keyHandlers = definition.keyActions
    ? getKeyDownHandlers(actionHandlers, definition.keyActions, isRtlEnabled)
    : {}

  if (process.env.NODE_ENV !== 'production') {
    // For the non-production builds we enable the runtime accessibility attributes validator.
    // We're adding the data-aa-class attribute which is being consumed by the validator, the
    // schema is located in @stardust-ui/ability-attributes package.
    if (definition.attributes) {
      const slotNames = Object.keys(definition.attributes)
      slotNames.forEach(slotName => {
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

export default getAccessibility
