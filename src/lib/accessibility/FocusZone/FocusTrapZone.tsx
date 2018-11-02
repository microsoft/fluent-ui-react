import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import eventStack from '../../eventStack'

import {
  getNextElement,
  getFirstTabbable,
  getLastTabbable,
  getWindow,
  focusAsync,
  HIDDEN_FROM_ACC_TREE,
} from './focusUtilities'

import { FocusTrapZoneProps } from './FocusTrapZone.types'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'
import * as customPropTypes from '../../customPropTypes'

/** FocusTrapZone is used to trap the focus in any html element placed in body
 *  and hide other elements outside of Focus Trap Zone from accessibility tree.
 *  Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone. */
export class FocusTrapZone extends React.Component<FocusTrapZoneProps, {}> {
  private static _focusStack: FocusTrapZone[] = []
  private _root: { current: HTMLElement | null } = { current: null }
  private _previouslyFocusedElementOutsideTrapZone: HTMLElement
  private _previouslyFocusedElementInTrapZone?: HTMLElement
  private windowElement: Window | null

  private createRef = elem => (this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement)

  static propTypes = {
    /**
     * Element type the root element will use. Default is "div".
     */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /**
     * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
     * @default The element.target that triggered the FTZ.
     */
    elementToFocusOnDismiss: PropTypes.object,

    /**
     * Sets the aria-labelledby attribute.
     */
    ariaLabelledBy: PropTypes.string,

    /**
     * Indicates if this Trap Zone will allow clicks outside the FocusTrapZone
     * @default false
     */
    isClickableOutsideFocusTrap: PropTypes.bool,

    /**
     * Indicates if this Trap Zone will ignore keeping track of HTMLElement that activated the Zone.
     * @default false
     */
    ignoreExternalFocusing: PropTypes.bool,

    /**
     * Indicates whether focus trap zone should force focus inside the focus trap zone
     * @default true
     */
    forceFocusInsideTrap: PropTypes.bool,

    /**
     * Indicates the selector for first focusable item.  Only applies if focusPreviouslyFocusedInnerElement == false.
     */
    firstFocusableSelector: PropTypes.string,

    /**
     * Do not put focus onto first element when render focus trap zone
     * @default false
     */
    disableFirstFocus: PropTypes.bool,

    /**
     * Specifies the algorithm used to determine which descendant element to focus when focus() is called.
     * If false, the first focusable descendant, filtered by the firstFocusableSelector property if present, is chosen.
     * If true, the element that was focused when the Trap Zone last had a focused descendant is chosen.
     * If it has never had a focused descendant before, behavior falls back to the first focused descendant.
     * @default false
     */
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
  }

  static defaultProps: FocusTrapZoneProps = {
    as: 'div',
    isClickableOutsideFocusTrap: true,
  }

  public componentDidMount(): void {
    FocusTrapZone._focusStack.push(this)
    const { disableFirstFocus = false } = this.props

    this.windowElement = getWindow(this._root.current)
    this._previouslyFocusedElementOutsideTrapZone = this._getPreviouslyFocusedElementOutsideTrapZone()

    if (
      !this._root.current.contains(this._previouslyFocusedElementOutsideTrapZone) &&
      !disableFirstFocus
    ) {
      this._findElementAndFocusAsync()
    }

    this._hideContentFromAccessibilityTree()
    this._subscribeToEvents()
  }

  public render(): JSX.Element {
    const { className, ariaLabelledBy } = this.props
    const rest = getUnhandledProps(
      { handledProps: [..._.keys(FocusTrapZone.propTypes)] },
      this.props,
    )
    const ElementType = getElementType({ defaultProps: FocusTrapZone.defaultProps }, this.props)

    return (
      <ElementType
        {...rest}
        className={className}
        ref={this.createRef}
        aria-labelledby={ariaLabelledBy}
        onKeyDown={this._onKeyboardHandler}
        onFocusCapture={this._onFocusCapture}
        data-focustrap="balbak"
      >
        {this.props.children}
      </ElementType>
    )
  }

  public componentWillUnmount(): void {
    const { ignoreExternalFocusing } = this.props

    FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter((value: FocusTrapZone) => {
      return this !== value
    })

    const activeElement = document.activeElement as HTMLElement
    if (
      !ignoreExternalFocusing &&
      this._previouslyFocusedElementOutsideTrapZone &&
      (this._root.current.contains(activeElement) || activeElement === document.body)
    ) {
      focusAsync(this._previouslyFocusedElementOutsideTrapZone)
    }

    this._unsubscribeFromEvents()
    const lastActiveFocusTrap =
      FocusTrapZone._focusStack.length &&
      FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]

    if (!lastActiveFocusTrap) {
      this._showContentInAccessibilityTree()
    } else if (
      lastActiveFocusTrap._root.current &&
      lastActiveFocusTrap._root.current.hasAttribute(HIDDEN_FROM_ACC_TREE)
    ) {
      lastActiveFocusTrap._root.current.removeAttribute(HIDDEN_FROM_ACC_TREE)
      lastActiveFocusTrap._root.current.removeAttribute('aria-hidden')
    }
  }

  private _findElementAndFocusAsync = () => {
    if (!this._root.current) return
    const { focusPreviouslyFocusedInnerElement, firstFocusableSelector } = this.props

    if (
      focusPreviouslyFocusedInnerElement &&
      this._previouslyFocusedElementInTrapZone &&
      this._root.current.contains(this._previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      focusAsync(this._previouslyFocusedElementInTrapZone)
      return
    }

    const focusSelector =
      firstFocusableSelector &&
      (typeof firstFocusableSelector === 'string'
        ? firstFocusableSelector
        : firstFocusableSelector())

    const firstFocusableChild = focusSelector
      ? (this._root.current.querySelector('.' + focusSelector) as HTMLElement)
      : getNextElement(
          this._root.current,
          this._root.current.firstChild as HTMLElement,
          true,
          false,
          false,
          true,
        )

    firstFocusableChild && focusAsync(firstFocusableChild)
  }

  private _onFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    this.props.onFocusCapture && this.props.onFocusCapture(ev)
    if (ev.target !== ev.currentTarget) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      this._previouslyFocusedElementInTrapZone = ev.target as HTMLElement
    }
  }

  private _onKeyboardHandler = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    this.props.onKeyDown && this.props.onKeyDown(ev)

    if (
      ev.isDefaultPrevented() ||
      keyboardKey.getCode(ev) !== keyboardKey.Tab ||
      !this._root.current
    ) {
      return
    }

    const _firstTabbableChild = getFirstTabbable(
      this._root.current,
      this._root.current.firstChild as HTMLElement,
      true,
    )
    const _lastTabbableChild = getLastTabbable(
      this._root.current,
      this._root.current.lastChild as HTMLElement,
      true,
    )

    if (ev.shiftKey && _firstTabbableChild === ev.target) {
      focusAsync(_lastTabbableChild)
      ev.preventDefault()
      ev.stopPropagation()
    } else if (!ev.shiftKey && _lastTabbableChild === ev.target) {
      focusAsync(_firstTabbableChild)
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  private _forceFocusInTrap = (ev: Event, triggeredElement: HTMLElement) => {
    if (
      FocusTrapZone._focusStack.length &&
      this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]
    ) {
      if (!this._root.current.contains(triggeredElement)) {
        this._findElementAndFocusAsync()
        ev.preventDefault()
        ev.stopPropagation()
      }
    }
  }

  private _handleOutsideFocus = (ev: FocusEvent): void => {
    const focusedElement = document.activeElement as HTMLElement
    focusedElement && this._forceFocusInTrap(ev, focusedElement)
  }

  private _handleOutsideClick = (ev: MouseEvent): void => {
    const clickedElement = ev.target as HTMLElement
    clickedElement && this._forceFocusInTrap(ev, clickedElement)
  }

  private _subscribeToEvents = () => {
    const { forceFocusInsideTrap, isClickableOutsideFocusTrap } = this.props
    if (forceFocusInsideTrap) {
      eventStack.sub('focus', this._handleOutsideFocus, {
        target: this.windowElement,
        useCapture: true,
      })
    }

    if (!isClickableOutsideFocusTrap) {
      eventStack.sub('click', this._handleOutsideClick, {
        target: this.windowElement,
        useCapture: true,
      })
    }
  }

  private _unsubscribeFromEvents = () => {
    const { forceFocusInsideTrap, isClickableOutsideFocusTrap } = this.props
    if (forceFocusInsideTrap) {
      eventStack.unsub('focus', this._handleOutsideFocus, {
        target: this.windowElement,
        useCapture: true,
      })
    }

    if (!isClickableOutsideFocusTrap) {
      eventStack.unsub('click', this._handleOutsideClick, {
        target: this.windowElement,
        useCapture: true,
      })
    }
  }

  private _getPreviouslyFocusedElementOutsideTrapZone = () => {
    const { elementToFocusOnDismiss } = this.props
    let previouslyFocusedElement = this._previouslyFocusedElementOutsideTrapZone

    if (elementToFocusOnDismiss && previouslyFocusedElement !== elementToFocusOnDismiss) {
      previouslyFocusedElement = elementToFocusOnDismiss
    } else if (!previouslyFocusedElement) {
      previouslyFocusedElement = document.activeElement as HTMLElement
    }

    return previouslyFocusedElement
  }

  private _hideContentFromAccessibilityTree = () => {
    const bodyChildren = (document.body && document.body.children) || []

    if (bodyChildren.length && !document.body.contains(this._root.current)) {
      // In case popup render options will change
      console.warn(
        'Body element does not contain trap zone element. Please, ensure the trap zone element is placed inside body, so it will work properly.',
      )
    }

    // loop through all body's children, except the last one - which is the popup
    for (let index = 0; index < bodyChildren.length - 1; index++) {
      const element = bodyChildren[index]

      if (element.getAttribute('aria-hidden') !== 'true') {
        element.setAttribute('aria-hidden', 'true')
        element.setAttribute(HIDDEN_FROM_ACC_TREE, 'true')
      }
    }
  }

  private _showContentInAccessibilityTree = () => {
    const hiddenElements = document.querySelectorAll(`[${HIDDEN_FROM_ACC_TREE}="true"]`)
    for (let index = 0; index < hiddenElements.length; index++) {
      const element = hiddenElements[index]
      element.removeAttribute('aria-hidden')
      element.removeAttribute(HIDDEN_FROM_ACC_TREE)
    }
  }
}
