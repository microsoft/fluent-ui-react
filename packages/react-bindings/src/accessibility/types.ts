import { AccessibilityAttributesBySlot, AccessibilityDefinition } from '@stardust-ui/accessibility'
import * as React from 'react'

export interface AccessibilityBehavior extends AccessibilityDefinition {
  attributes: AccessibilityAttributesBySlot
  keyHandlers: AccessibilityKeyHandlers
}

export type AccessibilityKeyHandlers = {
  [slotName: string]: AccessibilityHandlerProps
}

export type AccessibilityHandlerProps = {
  onKeyDown?: AccessibilityKeyboardHandler
}

export type AccessibilityActionHandlers = {
  [actionName: string]: AccessibilityKeyboardHandler
}

export type AccessibilityKeyboardHandler = (event: React.KeyboardEvent) => void
