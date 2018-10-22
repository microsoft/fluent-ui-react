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

import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.types'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'
import * as customPropTypes from '../../customPropTypes'

export class FocusTrapZone extends React.Component<IFocusTrapZoneProps, {}>
  implements IFocusTrapZone {
  private static _focusStack: FocusTrapZone[] = []
  private _root: { current: HTMLElement | null } = { current: null }
  private _previouslyFocusedElementOutsideTrapZone: HTMLElement
  private _previouslyFocusedElementInTrapZone?: HTMLElement
  private windowElement: Window | null

  private createRef = elem => (this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement)

  static propTypes = {
    as: customPropTypes.as,
    componentRef: PropTypes.object,
    className: PropTypes.string,
    elementToFocusOnDismiss: PropTypes.object,
    ariaLabelledBy: PropTypes.string,
    isClickableOutsideFocusTrap: PropTypes.bool,
    ignoreExternalFocusing: PropTypes.bool,
    forceFocusInsideTrap: PropTypes.bool,
    firstFocusableSelector: PropTypes.string,
    disableFirstFocus: PropTypes.bool,
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
  }

  static defaultProps: IFocusTrapZoneProps = {
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
      this.focus()
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
    const lastActiveFocusTrap = FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]

    if (!FocusTrapZone._focusStack.length) {
      this._showContentInAccessibilityTree()
    } else if (
      lastActiveFocusTrap._root.current &&
      lastActiveFocusTrap._root.current.hasAttribute(HIDDEN_FROM_ACC_TREE)
    ) {
      lastActiveFocusTrap._root.current.removeAttribute(HIDDEN_FROM_ACC_TREE)
      lastActiveFocusTrap._root.current.removeAttribute('aria-hidden')
    }
  }

  public focus() {
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
      typeof firstFocusableSelector === 'string'
        ? firstFocusableSelector
        : firstFocusableSelector && firstFocusableSelector()

    let _firstFocusableChild

    if (focusSelector) {
      _firstFocusableChild = this._root.current.querySelector('.' + focusSelector)
    } else {
      _firstFocusableChild = getNextElement(
        this._root.current,
        this._root.current.firstChild as HTMLElement,
        true,
        false,
        false,
        true,
      )
    }

    _firstFocusableChild && focusAsync(_firstFocusableChild)
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

  private _forceFocusInTrap = (ev: FocusEvent): void => {
    if (
      FocusTrapZone._focusStack.length &&
      this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]
    ) {
      const focusedElement = document.activeElement as HTMLElement

      if (!this._root.current.contains(focusedElement)) {
        this.focus()
        ev.preventDefault()
        ev.stopPropagation()
      }
    }
  }

  private _forceClickInTrap = (ev: MouseEvent): void => {
    if (
      FocusTrapZone._focusStack.length &&
      this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]
    ) {
      const clickedElement = ev.target as HTMLElement

      if (clickedElement && !this._root.current.contains(clickedElement)) {
        this.focus()
        ev.preventDefault()
        ev.stopPropagation()
      }
    }
  }

  private _subscribeToEvents = () => {
    const { forceFocusInsideTrap, isClickableOutsideFocusTrap } = this.props
    if (forceFocusInsideTrap) {
      eventStack.sub('focus', this._forceFocusInTrap, {
        target: this.windowElement,
        useCapture: true,
      })
    }

    if (!isClickableOutsideFocusTrap) {
      eventStack.sub('click', this._forceClickInTrap, {
        target: this.windowElement,
        useCapture: true,
      })
    }
  }

  private _unsubscribeFromEvents = () => {
    const { forceFocusInsideTrap, isClickableOutsideFocusTrap } = this.props
    if (forceFocusInsideTrap) {
      eventStack.unsub('focus', this._forceFocusInTrap, {
        target: this.windowElement,
        useCapture: true,
      })
    }

    if (!isClickableOutsideFocusTrap) {
      eventStack.unsub('click', this._forceClickInTrap, {
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
        'Body does not contain trap zone element as expected. If it is done intentionally, please, make sure to update FocusTrapZone.',
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
