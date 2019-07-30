import { PropsWithVarsAndStyles, State } from '../../themes/types'
import { Accessibility, AccessibilityDefinition } from './types'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from './reactTypes'
import getKeyDownHandlers from '../getKeyDownHandlers'

const emptyBehavior: ReactAccessibilityBehavior = {
  attributes: {},
  keyHandlers: {},
}

const getAccessibility = (
  behavior: Accessibility,
  props: State & PropsWithVarsAndStyles,
  actionHandlers: AccessibilityActionHandlers,
  isRtlEnabled: boolean,
): ReactAccessibilityBehavior => {
  if (!behavior) {
    return emptyBehavior
  }

  const definition: AccessibilityDefinition = behavior(props)
  const keyHandlers = getKeyDownHandlers(actionHandlers, definition.keyActions, isRtlEnabled)

  return {
    ...emptyBehavior,
    ...definition,
    keyHandlers,
  }
}

export default getAccessibility
