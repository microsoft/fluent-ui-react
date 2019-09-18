import * as React from 'react'
import { AccessibilityAttributesBySlot, AccessibilityDefinition } from './types'

/*
 * Accessibility types for React implementation.
 */

export interface ReactAccessibilityBehavior extends AccessibilityDefinition {
  attributes: AccessibilityAttributesBySlot
  keyHandlers: AccessibilityKeyHandlers
}

export type AccessibilityKeyHandlers = {
  [slotName: string]: AccessibilityHandlerProps
}

export type AccessibilityHandlerProps = {
  onKeyDown?: KeyboardEventHandler
}

export type AccessibilityActionHandlers = {
  [actionName: string]: KeyboardEventHandler
}

export type KeyboardEventHandler = (event: React.KeyboardEvent) => void
