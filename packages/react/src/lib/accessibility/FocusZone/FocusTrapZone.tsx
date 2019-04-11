import * as customPropTypes from '@stardust-ui/react-proptypes'
import { EventListener } from '@stardust-ui/react-component-event-listener'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

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

/** FocusTrapZone is used to trap the focus in any html element placed in body
 *  and hide other elements outside of Focus Trap Zone from accessibility tree.
 *  Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone. */
export class FocusTrapZone extends React.Component<FocusTrapZoneProps, {}> {
  private static _focusStack: FocusTrapZone[] = []
  private _root: { current: HTMLElement | null } = { current: null }
  private _previouslyFocusedElementOutsideTrapZone: HTMLElement
  private _previouslyFocusedElementInTrapZone?: HTMLElement
  private windowRef = React.createRef<Window>()

  private createRef = elem => {
    this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement
    // @ts-ignore
    this.windowRef.current = getWindow(this._root.current)
  }
  private shouldHandleOutsideClick = () =>
    !this.props.isClickableOutsideFocusTrap || !this.props.focusTriggerOnOutsideClick

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    elementToFocusOnDismiss: PropTypes.object,
    ariaLabelledBy: PropTypes.string,
    isClickableOutsideFocusTrap: PropTypes.bool,
    ignoreExternalFocusing: PropTypes.bool,
    forceFocusInsideTrap: PropTypes.bool,
    firstFocusableSelector: PropTypes.string,
    disableFirstFocus: PropTypes.bool,
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
    focusTriggerOnOutsideClick: PropTypes.bool,
  }

  static defaultProps: FocusTrapZoneProps = {
    as: 'div',
    isClickableOutsideFocusTrap: true,
  }

  public componentDidMount(): void {
    FocusTrapZone._focusStack.push(this)
    const { disableFirstFocus = false } = this.props

    this._previouslyFocusedElementOutsideTrapZone = this._getPreviouslyFocusedElementOutsideTrapZone()

    if (
      !this._root.current.contains(this._previouslyFocusedElementOutsideTrapZone) &&
      !disableFirstFocus
    ) {
      this._findElementAndFocusAsync()
    }

    this._hideContentFromAccessibilityTree()
  }

  public render(): JSX.Element {
    const { className, forceFocusInsideTrap, ariaLabelledBy } = this.props
    const unhandledProps = getUnhandledProps(
      { handledProps: [..._.keys(FocusTrapZone.propTypes)] },
      this.props,
    )
    const ElementType = getElementType({ defaultProps: FocusTrapZone.defaultProps }, this.props)

    return (
      <>
        <ElementType
          {...unhandledProps}
          className={className}
          ref={this.createRef}
          aria-labelledby={ariaLabelledBy}
          onKeyDown={this._onKeyboardHandler}
          onFocusCapture={this._onFocusCapture}
        >
          {this.props.children}
        </ElementType>

        {forceFocusInsideTrap && (
          <EventListener
            capture
            listener={this._handleOutsideFocus}
            targetRef={this.windowRef}
            type="focus"
          />
        )}
        {this.shouldHandleOutsideClick() && (
          <EventListener
            capture
            listener={this._handleOutsideClick}
            targetRef={this.windowRef}
            type="click"
          />
        )}
      </>
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
      ? (this._root.current.querySelector(`.${focusSelector}`) as HTMLElement)
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

    // do not propogate keyboard events outside focus trap zone
    ev.stopPropagation()

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
    } else if (!ev.shiftKey && _lastTabbableChild === ev.target) {
      focusAsync(_firstTabbableChild)
      ev.preventDefault()
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
    const { isClickableOutsideFocusTrap, focusTriggerOnOutsideClick } = this.props

    if (!isClickableOutsideFocusTrap) {
      clickedElement && this._forceFocusInTrap(ev, clickedElement)
    } else if (!focusTriggerOnOutsideClick) {
      const isOutsideFocusTrapZone =
        this._root.current && !this._root.current.contains(clickedElement)
      const isOutsideTriggerElement =
        this._previouslyFocusedElementOutsideTrapZone &&
        !this._previouslyFocusedElementOutsideTrapZone.contains(clickedElement)
      if (isOutsideFocusTrapZone && isOutsideTriggerElement) {
        // set it to NULL, so the trigger will not be focused on componentWillUnmount
        this._previouslyFocusedElementOutsideTrapZone = null
      }
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

    for (let index = 0; index < bodyChildren.length; index++) {
      const currentChild = bodyChildren[index] as HTMLElement
      const isOrHasFocusTrapZone =
        currentChild === this._root.current || currentChild.contains(this._root.current)
      const isAriaLiveRegion = currentChild.hasAttribute('aria-live')

      if (
        !isOrHasFocusTrapZone &&
        !isAriaLiveRegion &&
        currentChild.getAttribute('aria-hidden') !== 'true'
      ) {
        currentChild.setAttribute('aria-hidden', 'true')
        currentChild.setAttribute(HIDDEN_FROM_ACC_TREE, 'true')
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
