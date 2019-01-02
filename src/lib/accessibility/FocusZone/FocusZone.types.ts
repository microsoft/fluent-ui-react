import * as React from 'react'
import { FocusZone } from './FocusZone'

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
export interface FocusZoneProps extends React.HTMLAttributes<HTMLElement | FocusZone> {
  /**
   * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
   */
  className?: string

  /**
   * Defines which arrows to react to.
   * @default FocusZoneDirection.bidirectional
   */
  direction?: FocusZoneDirection

  /**
   * Function which uses root element to select and return the intial tabbable element.
   */
  defaultTabbableElement?: (root: HTMLElement) => HTMLElement

  /**
   * If a default tabbable element should be force focused on FocusZone mount.
   */
  shouldFocusOnMount?: boolean

  /**
   * If true, focus will go either to defaultTabbableElement if set or first focusable element inside FocusZone,
   * when FocusZone container receives focus.
   */
  shouldFocusInnerElementWhenReceivedFocus?: boolean

  /**
   * If true and handleTab is false, resets current activeElement to null value.
   */
  shouldResetActiveElementWhenTabFromZone?: boolean

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean

  /**
   * Element type the root element will use. Default is "div".
   */
  as?: React.ReactType

  /**
   * If true, FocusZone behavior will change to match RTL environments (left/right arrows switched).
   */
  isRtl?: boolean

  /**
   * If set, will cycle to the beginning of the targets once the user navigates to the
   * next target while at the end, and to the end when navigate to the previous at the beginning.
   */
  isCircularNavigation?: boolean

  /**
   * If provided, this callback will be executed on keypresses to determine if the user
   * intends to navigate into the inner zone. Returning true will ask the first inner zone to
   * set focus.
   */
  shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  shouldReceiveFocus?: (childElement?: HTMLElement) => boolean

  /** Allow focus to move to root */
  allowFocusRoot?: boolean

  /**
   * Allows tab key to be handled to tab through a list of items in the focus zone,
   * an unfortunate side effect is that users will not be able to tab out of the focus zone
   * and have to hit escape or some other key.
   */
  handleTabKey?: FocusZoneTabbableElements

  /**
   * A callback method to determine if the input element should lose focus on arrow keys.
   * For example: use arrow keys to navigate when an input element is empty or when cursor is at the beginning/end of a string.
   *  @param {HTMLInputElement} inputElement The input element which is to lose focus.
   *  @returns True if input element should lose focus or false otherwise.
   */
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean

  /**
   * Whether the FocusZone should stop focus event propagation past the FocusZone
   */
  stopFocusPropagation?: boolean

  /**
   * Callback to notify creators that focus has been set on the FocusZone
   *  @param {FocusEvent} event - React's original FocusEvent.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement | FocusZone>) => void

  /**
   * Whether the FocusZone prevents default when handled a key event
   */
  preventDefaultWhenHandled?: boolean
}

export const enum FocusZoneTabbableElements {
  /** Tabbing is not allowed */
  none = 0,

  /** All tabbing action is allowed */
  all = 1,

  /** Tabbing is allowed only on input elements */
  inputOnly = 2,
}

export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical = 0,

  /** Only react to left/right arrows. */
  horizontal = 1,

  /** React to all arrows. */
  bidirectional = 2,
}
