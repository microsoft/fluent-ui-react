import { FocusZoneProperties } from '@stardust-ui/accessibility'
import * as React from 'react'

import FocusZone from './FocusZone'

/**
 * FocusZone component class interface.
 */
export interface IFocusZone {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param {boolean} forceIntoFirstElement If true, focus will be forced into the first element, even if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusLast(): boolean

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean
}

/**
 * FocusZone component props.
 */
export interface FocusZoneProps
  extends FocusZoneProperties,
    React.HTMLAttributes<HTMLElement | FocusZone> {
  /** Element type the root element will use. */
  as?: React.ReactType

  /**
   * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
   */
  className?: string

  /**
   * Callback function that will be executed on keypresses to determine if the user intends to navigate into
   * the inner (nested) zone. Returning true will ask the first inner zone to set focus.
   * For example, when chat container is FocusZone and chat messages are inner focus zones.
   * Navigation between messages possible with up/down arrow keys, but when pressing Enter, focus should go to
   * focusable elements inside message, for example, a link.
   */
  shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void

  /**
   * Callback called when "focus" event triggered in FocusZone.
   * @param {FocusEvent} event - React's original FocusEvent.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement | FocusZone>) => void
}
