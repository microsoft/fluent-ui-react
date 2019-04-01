import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import {
  FocusZoneDirection,
  FocusZoneTabbableElements,
  IFocusZone,
  FocusZoneProps,
} from './FocusZone.types'
import * as keyboardKey from 'keyboard-key'
import cx from 'classnames'
import * as _ from 'lodash'
import {
  getNextElement,
  getPreviousElement,
  isElementFocusZone,
  isElementFocusSubZone,
  isElementTabbable,
  getWindow,
  IS_FOCUSABLE_ATTRIBUTE,
  FOCUSZONE_ID_ATTRIBUTE,
} from './focusUtilities'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'

const TABINDEX = 'tabindex'
const LARGE_DISTANCE_FROM_CENTER = 999999999

const _allInstances: {
  [key: string]: FocusZone
} = {}

interface Point {
  left: number
  top: number
}
const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search']

function getParent(child: HTMLElement): HTMLElement | null {
  return child && child.parentElement
}

export class FocusZone extends React.Component<FocusZoneProps> implements IFocusZone {
  static propTypes = {
    className: PropTypes.string,
    direction: PropTypes.number,
    defaultTabbableElement: PropTypes.func,
    shouldFocusOnMount: PropTypes.bool,
    shouldResetActiveElementWhenTabFromZone: PropTypes.bool,
    shouldFocusInnerElementWhenReceivedFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    as: customPropTypes.as,
    isCircularNavigation: PropTypes.bool,
    shouldEnterInnerZone: PropTypes.func,
    onActiveElementChanged: PropTypes.func,
    shouldReceiveFocus: PropTypes.func,
    allowFocusRoot: PropTypes.bool,
    handleTabKey: PropTypes.number,
    shouldInputLoseFocusOnArrowKey: PropTypes.func,
    stopFocusPropagation: PropTypes.bool,
    onFocus: PropTypes.func,
    preventDefaultWhenHandled: PropTypes.bool,
    isRtl: PropTypes.bool,
  }

  static defaultProps: FocusZoneProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional,
    as: 'div',
  }

  static displayName = 'FocusZone'
  static className = 'ms-FocusZone'

  private _root: { current: HTMLElement | null } = { current: null }
  private _id: string
  /** The most recently focused child element. */
  private _activeElement: HTMLElement | null
  /** The child element with tabindex=0. */
  private _defaultFocusElement: HTMLElement | null
  private _focusAlignment: Point
  private _isInnerZone: boolean

  /** Used to allow us to move to next focusable element even when we're focusing on a input element when pressing tab */
  private _processingTabKey: boolean

  private windowElement: Window | null

  constructor(props: FocusZoneProps) {
    super(props)

    this._id = _.uniqueId('FocusZone')

    this._focusAlignment = {
      left: 0,
      top: 0,
    }

    this._processingTabKey = false
    this.onKeyDownCapture = this.onKeyDownCapture.bind(this)
  }

  public componentDidMount(): void {
    _allInstances[this._id] = this

    this.setRef(this) // called here to support functional components, we only need HTMLElement ref anyway
    if (this._root.current) {
      this.windowElement = getWindow(this._root.current)

      let parentElement = getParent(this._root.current)

      while (parentElement && parentElement !== document.body && parentElement.nodeType === 1) {
        if (isElementFocusZone(parentElement)) {
          this._isInnerZone = true
          break
        }
        parentElement = getParent(parentElement)
      }

      if (!this._isInnerZone) {
        this.windowElement.addEventListener('keydown', this.onKeyDownCapture, true)
      }

      // Assign initial tab indexes so that we can set initial focus as appropriate.
      this.updateTabIndexes()

      if (this.props.shouldFocusOnMount) {
        this.focus()
      }
    }
  }

  public componentWillUnmount() {
    delete _allInstances[this._id]
    if (this.windowElement) {
      this.windowElement.removeEventListener('keydown', this.onKeyDownCapture, true)
    }
  }

  render() {
    const { className } = this.props

    const ElementType = getElementType({ defaultProps: FocusZone.defaultProps }, this.props)
    const unhandledProps = getUnhandledProps(
      { handledProps: [..._.keys(FocusZone.propTypes)] },
      this.props,
    )

    return (
      <ElementType
        {...unhandledProps}
        className={cx(FocusZone.className, className)}
        data-focuszone-id={this._id}
        onKeyDown={this._onKeyDown}
        onFocus={this._onFocus}
        onMouseDownCapture={this._onMouseDown}
      >
        {this.props.children}
      </ElementType>
    )
  }

  /**
   * Sets focus to the first tabbable item in the zone.
   * @param {boolean} forceIntoFirstElement If true, focus will be forced into the first element, even if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement: boolean = false): boolean {
    if (this._root.current) {
      if (
        !forceIntoFirstElement &&
        this._root.current.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
        this._isInnerZone
      ) {
        const ownerZoneElement = this.getOwnerZone(this._root.current) as HTMLElement

        if (ownerZoneElement !== this._root.current) {
          const ownerZone =
            _allInstances[ownerZoneElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string]

          return !!ownerZone && ownerZone.focusElement(this._root.current)
        }

        return false
      }
      if (
        !forceIntoFirstElement &&
        this._activeElement &&
        this._root.current.contains(this._activeElement) &&
        isElementTabbable(this._activeElement)
      ) {
        this._activeElement.focus()
        return true
      }

      const firstChild = this._root.current.firstChild as HTMLElement

      return this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement)
    }
    return false
  }

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusLast(): boolean {
    if (this._root.current) {
      const lastChild = this._root.current && (this._root.current.lastChild as HTMLElement | null)

      return this.focusElement(getPreviousElement(
        this._root.current,
        lastChild,
        true,
        true,
        true,
      ) as HTMLElement)
    }

    return false
  }

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(element: HTMLElement): boolean {
    const { shouldReceiveFocus } = this.props

    if (shouldReceiveFocus && !shouldReceiveFocus(element)) {
      return false
    }

    if (element) {
      this.setActiveElement(element)
      if (this._activeElement) {
        this._activeElement.focus()
      }

      return true
    }

    return false
  }

  private setRef = (elem: React.ReactInstance): void => {
    // findDOMNode needed to get correct DOM ref with react-hot-loader, see https://github.com/gaearon/react-hot-loader/issues/964
    this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement
  }

  private _onFocus = (ev: React.FocusEvent<HTMLElement>): void => {
    const {
      onActiveElementChanged,
      stopFocusPropagation,
      shouldFocusInnerElementWhenReceivedFocus,
      defaultTabbableElement,
    } = this.props

    let newActiveElement: HTMLElement | undefined

    if (this.isImmediateDescendantOfZone(ev.target as HTMLElement)) {
      newActiveElement = ev.target as HTMLElement
    } else {
      let parentElement = ev.target as HTMLElement

      while (parentElement && parentElement !== this._root.current) {
        if (isElementTabbable(parentElement) && this.isImmediateDescendantOfZone(parentElement)) {
          newActiveElement = parentElement
          break
        }
        parentElement = getParent(parentElement) as HTMLElement
      }
    }

    // If an inner focusable element should be focused when FocusZone container receives focus
    if (shouldFocusInnerElementWhenReceivedFocus && ev.target === this._root.current) {
      const maybeElementToFocus =
        defaultTabbableElement && defaultTabbableElement(this._root.current)

      // try to focus defaultTabbable element
      if (maybeElementToFocus && isElementTabbable(maybeElementToFocus)) {
        newActiveElement = maybeElementToFocus
        maybeElementToFocus.focus()
      } else {
        // force focus on first focusable element
        this.focus(true)
        if (this._activeElement) {
          // set to null as new active element was handled in method above
          newActiveElement = null
        }
      }
    }

    if (newActiveElement && newActiveElement !== this._activeElement) {
      this._activeElement = newActiveElement
      this.setFocusAlignment(newActiveElement, true)
      this.updateTabIndexes()
    }

    if (onActiveElementChanged) {
      onActiveElementChanged(this._activeElement as HTMLElement, ev)
    }

    if (stopFocusPropagation) {
      ev.stopPropagation()
    }

    _.invoke(this.props, 'onFocus', ev)
  }

  /**
   * Handle global tab presses so that we can patch tabindexes on the fly.
   */
  private onKeyDownCapture(ev: KeyboardEvent) {
    if (keyboardKey.getCode(ev) === keyboardKey.Tab) {
      this.updateTabIndexes()
    }
  }

  private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
    const { disabled } = this.props

    if (disabled) {
      return
    }

    let target = ev.target as HTMLElement
    const path: HTMLElement[] = []

    while (target && target !== this._root.current) {
      path.push(target)
      target = getParent(target) as HTMLElement
    }

    while (path.length) {
      target = path.pop() as HTMLElement

      if (target && isElementTabbable(target)) {
        this.setActiveElement(target, true)
      }

      if (isElementFocusZone(target)) {
        // Stop here since the focus zone will take care of its own children.
        break
      }
    }
  }

  private setActiveElement(element: HTMLElement, forceAlignemnt?: boolean): void {
    const previousActiveElement = this._activeElement

    this._activeElement = element

    if (previousActiveElement) {
      if (isElementFocusZone(previousActiveElement)) {
        this.updateTabIndexes(previousActiveElement)
      }

      previousActiveElement.tabIndex = -1
    }

    if (this._activeElement) {
      if (!this._focusAlignment || forceAlignemnt) {
        this.setFocusAlignment(element, true, true)
      }

      this._activeElement.tabIndex = 0
    }
  }

  private preventDefaultWhenHandled(ev: React.KeyboardEvent<HTMLElement>): void {
    this.props.preventDefaultWhenHandled && ev.preventDefault()
  }

  /**
   * Handle the keystrokes.
   */
  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
    const { direction, disabled, shouldEnterInnerZone } = this.props

    if (disabled) {
      return undefined
    }

    if (document.activeElement === this._root.current && this._isInnerZone) {
      // If this element has focus, it is being controlled by a parent.
      // Ignore the keystroke.
      return undefined
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev)
    }

    // If the default has been prevented, do not process keyboard events.
    if (ev.isDefaultPrevented()) {
      return undefined
    }

    if (
      shouldEnterInnerZone &&
      shouldEnterInnerZone(ev) &&
      this.isImmediateDescendantOfZone(ev.target as HTMLElement)
    ) {
      // Try to focus
      const innerZone = this.getFirstInnerZone()

      if (innerZone) {
        if (!innerZone.focus(true)) {
          return undefined
        }
      } else if (isElementFocusSubZone(ev.target as HTMLElement)) {
        if (
          !this.focusElement(getNextElement(
            ev.target as HTMLElement,
            (ev.target as HTMLElement).firstChild as HTMLElement,
            true,
          ) as HTMLElement)
        ) {
          return undefined
        }
      } else {
        return undefined
      }
    } else if (ev.altKey) {
      return undefined
    } else {
      switch (keyboardKey.getCode(ev)) {
        case keyboardKey.Spacebar:
          if (this.tryInvokeClickForFocusable(ev.target as HTMLElement)) {
            break
          }
          return undefined

        case keyboardKey.ArrowLeft:
          if (direction !== FocusZoneDirection.vertical) {
            this.preventDefaultWhenHandled(ev)
            if (this.moveFocusLeft()) {
              break
            }
          }
          return undefined

        case keyboardKey.ArrowRight:
          if (direction !== FocusZoneDirection.vertical) {
            this.preventDefaultWhenHandled(ev)
            if (this.moveFocusRight()) {
              break
            }
          }
          return undefined

        case keyboardKey.ArrowUp:
          if (direction !== FocusZoneDirection.horizontal) {
            this.preventDefaultWhenHandled(ev)
            if (this.moveFocusUp()) {
              break
            }
          }
          return undefined

        case keyboardKey.ArrowDown:
          if (direction !== FocusZoneDirection.horizontal) {
            this.preventDefaultWhenHandled(ev)
            if (this.moveFocusDown()) {
              break
            }
          }
          return undefined

        case keyboardKey.Tab:
          if (
            this.props.handleTabKey === FocusZoneTabbableElements.all ||
            (this.props.handleTabKey === FocusZoneTabbableElements.inputOnly &&
              this.isElementInput(ev.target as HTMLElement))
          ) {
            let focusChanged = false
            this._processingTabKey = true
            if (direction === FocusZoneDirection.vertical) {
              focusChanged = ev.shiftKey ? this.moveFocusUp() : this.moveFocusDown()
            } else if (
              direction === FocusZoneDirection.horizontal ||
              direction === FocusZoneDirection.bidirectional
            ) {
              const tabWithDirection = this.props.isRtl ? !ev.shiftKey : ev.shiftKey
              focusChanged = tabWithDirection ? this.moveFocusLeft() : this.moveFocusRight()
            }
            this._processingTabKey = false
            if (focusChanged) {
              break
            }
          } else if (this.props.shouldResetActiveElementWhenTabFromZone) {
            this._activeElement = null
          }
          return undefined

        case keyboardKey.Home:
          if (
            this.isElementInput(ev.target as HTMLElement) &&
            !this.shouldInputLoseFocus(ev.target as HTMLInputElement, false)
          ) {
            return false
          }
          const firstChild =
            this._root.current && (this._root.current.firstChild as HTMLElement | null)
          if (
            this._root.current &&
            firstChild &&
            this.focusElement(getNextElement(this._root.current, firstChild, true) as HTMLElement)
          ) {
            break
          }
          return undefined

        case keyboardKey.End:
          if (
            this.isElementInput(ev.target as HTMLElement) &&
            !this.shouldInputLoseFocus(ev.target as HTMLInputElement, true)
          ) {
            return false
          }

          const lastChild =
            this._root.current && (this._root.current.lastChild as HTMLElement | null)
          if (
            this._root.current &&
            this.focusElement(getPreviousElement(
              this._root.current,
              lastChild,
              true,
              true,
              true,
            ) as HTMLElement)
          ) {
            break
          }
          return undefined

        case keyboardKey.Enter:
          if (this.tryInvokeClickForFocusable(ev.target as HTMLElement)) {
            break
          }
          return undefined

        default:
          return undefined
      }
    }

    ev.preventDefault()
    ev.stopPropagation()

    return undefined
  }

  /**
   * Walk up the dom try to find a focusable element.
   * TODO
   */
  private tryInvokeClickForFocusable(onTarget: HTMLElement): boolean {
    return false
  }

  /**
   * Traverse to find first child zone.
   */
  private getFirstInnerZone(forRootElement?: HTMLElement | null): FocusZone | null {
    const rootElement = forRootElement || this._activeElement || this._root.current

    if (!rootElement) {
      return null
    }

    if (isElementFocusZone(rootElement)) {
      return _allInstances[rootElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string]
    }

    let child = rootElement.firstElementChild as HTMLElement | null

    while (child) {
      if (isElementFocusZone(child)) {
        return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE) as string]
      }
      const match = this.getFirstInnerZone(child)

      if (match) {
        return match
      }

      child = child.nextElementSibling as HTMLElement | null
    }

    return null
  }

  private moveFocus(
    isForward: boolean,
    getDistanceFromCenter: (activeRect: ClientRect, targetRect: ClientRect) => number,
    ev?: Event,
    useDefaultWrap: boolean = true,
  ): boolean {
    let element = this._activeElement
    let candidateDistance = -1
    let candidateElement: HTMLElement | undefined = undefined
    let changedFocus = false
    const isBidirectional = this.props.direction === FocusZoneDirection.bidirectional

    if (!element || !this._root.current) {
      return false
    }

    if (this.isElementInput(element)) {
      if (!this.shouldInputLoseFocus(element as HTMLInputElement, isForward)) {
        return false
      }
    }

    const activeRect = isBidirectional ? element.getBoundingClientRect() : null

    do {
      element = (isForward
        ? getNextElement(this._root.current, element)
        : getPreviousElement(this._root.current, element)) as HTMLElement

      if (isBidirectional) {
        if (element) {
          const targetRect = element.getBoundingClientRect()
          const elementDistance = getDistanceFromCenter(activeRect as ClientRect, targetRect)

          if (elementDistance === -1 && candidateDistance === -1) {
            candidateElement = element
            break
          }

          if (
            elementDistance > -1 &&
            (candidateDistance === -1 || elementDistance < candidateDistance)
          ) {
            candidateDistance = elementDistance
            candidateElement = element
          }

          if (candidateDistance >= 0 && elementDistance < 0) {
            break
          }
        }
      } else {
        candidateElement = element
        break
      }
    } while (element)

    // Focus the closest candidate
    if (candidateElement && candidateElement !== this._activeElement) {
      changedFocus = true
      this.focusElement(candidateElement)
    } else if (this.props.isCircularNavigation && useDefaultWrap) {
      if (isForward) {
        return this.focusElement(getNextElement(
          this._root.current,
          this._root.current.firstElementChild as HTMLElement,
          true,
        ) as HTMLElement)
      }
      return this.focusElement(getPreviousElement(
        this._root.current,
        this._root.current.lastElementChild as HTMLElement,
        true,
        true,
        true,
      ) as HTMLElement)
    }

    return changedFocus
  }

  private moveFocusDown(): boolean {
    let targetTop = -1
    const leftAlignment = this._focusAlignment.left

    if (
      this.moveFocus(true, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectTop = Math.floor(targetRect.top)
        const activeRectBottom = Math.floor(activeRect.bottom)

        if (targetRectTop < activeRectBottom) {
          return LARGE_DISTANCE_FROM_CENTER
        }

        if (
          (targetTop === -1 && targetRectTop >= activeRectBottom) ||
          targetRectTop === targetTop
        ) {
          targetTop = targetRectTop
          if (
            leftAlignment >= targetRect.left &&
            leftAlignment <= targetRect.left + targetRect.width
          ) {
            distance = 0
          } else {
            distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment)
          }
        }

        return distance
      })
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, false, true)
      return true
    }

    return false
  }

  private moveFocusUp(): boolean {
    let targetTop = -1
    const leftAlignment = this._focusAlignment.left

    if (
      this.moveFocus(false, (activeRect: ClientRect, targetRect: ClientRect) => {
        let distance = -1
        // ClientRect values can be floats that differ by very small fractions of a decimal.
        // If the difference between top and bottom are within a pixel then we should treat
        // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
        // but without Math.Floor they will be handled incorrectly.
        const targetRectBottom = Math.floor(targetRect.bottom)
        const targetRectTop = Math.floor(targetRect.top)
        const activeRectTop = Math.floor(activeRect.top)

        if (targetRectBottom > activeRectTop) {
          return LARGE_DISTANCE_FROM_CENTER
        }

        if (
          (targetTop === -1 && targetRectBottom <= activeRectTop) ||
          targetRectTop === targetTop
        ) {
          targetTop = targetRectTop
          if (
            leftAlignment >= targetRect.left &&
            leftAlignment <= targetRect.left + targetRect.width
          ) {
            distance = 0
          } else {
            distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment)
          }
        }

        return distance
      })
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, false, true)
      return true
    }

    return false
  }

  private moveFocusLeft(): boolean {
    if (
      this.moveFocus(
        this.props.isRtl,
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1
          let topBottomComparison

          if (this.props.isRtl) {
            // When in RTL, this comparison should be the same as the one in moveFocusRight for LTR.
            // Going left at a leftmost rectangle will go down a line instead of up a line like in LTR.
            // This is important, because we want to be comparing the top of the target rect
            // with the bottom of the active rect.
            topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3)
          } else {
            topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3)
          }

          if (
            topBottomComparison &&
            targetRect.right <= activeRect.right &&
            this.props.direction !== FocusZoneDirection.vertical
          ) {
            distance = activeRect.right - targetRect.right
          }

          return distance
        },
        undefined /*ev*/,
        true,
      )
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, true, false)
      return true
    }

    return false
  }

  private moveFocusRight(): boolean {
    if (
      this.moveFocus(
        !this.props.isRtl,
        (activeRect: ClientRect, targetRect: ClientRect) => {
          let distance = -1
          let topBottomComparison

          if (this.props.isRtl) {
            // When in RTL, this comparison should be the same as the one in moveFocusLeft for LTR.
            // Going right at a rightmost rectangle will go up a line instead of down a line like in LTR.
            // This is important, because we want to be comparing the bottom of the target rect
            // with the top of the active rect.
            topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3)
          } else {
            topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3)
          }

          if (
            topBottomComparison &&
            targetRect.left >= activeRect.left &&
            this.props.direction !== FocusZoneDirection.vertical
          ) {
            distance = targetRect.left - activeRect.left
          }

          return distance
        },
        undefined /*ev*/,
        true,
      )
    ) {
      this.setFocusAlignment(this._activeElement as HTMLElement, true, false)
      return true
    }

    return false
  }

  private setFocusAlignment(element: HTMLElement, isHorizontal?: boolean, isVertical?: boolean) {
    if (
      this.props.direction === FocusZoneDirection.bidirectional &&
      (!this._focusAlignment || isHorizontal || isVertical)
    ) {
      const rect = element.getBoundingClientRect()
      const left = rect.left + rect.width / 2
      const top = rect.top + rect.height / 2

      if (!this._focusAlignment) {
        this._focusAlignment = { left, top }
      }

      if (isHorizontal) {
        this._focusAlignment.left = left
      }

      if (isVertical) {
        this._focusAlignment.top = top
      }
    }
  }

  private isImmediateDescendantOfZone(element?: HTMLElement): boolean {
    return this.getOwnerZone(element) === this._root.current
  }

  private getOwnerZone(element?: HTMLElement): HTMLElement | null {
    let parentElement = getParent(element as HTMLElement)

    while (
      parentElement &&
      parentElement !== this._root.current &&
      parentElement !== document.body
    ) {
      if (isElementFocusZone(parentElement)) {
        return parentElement
      }

      parentElement = getParent(parentElement)
    }

    return this._root.current
  }

  private updateTabIndexes(onElement?: HTMLElement) {
    let element = onElement

    if (!this._activeElement && this.props.defaultTabbableElement) {
      this._activeElement = this.props.defaultTabbableElement(this._root.current)
    }

    if (!element && this._root.current) {
      this._defaultFocusElement = null
      element = this._root.current
      if (this._activeElement && !element.contains(this._activeElement)) {
        this._activeElement = null
      }
    }

    // If active element changes state to disabled, set it to null.
    // Otherwise, we lose keyboard accessibility to other elements in focus zone.
    if (this._activeElement && !isElementTabbable(this._activeElement)) {
      this._activeElement = null
    }

    const childNodes = element && element.children

    for (let childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
      const child = childNodes[childIndex] as HTMLElement

      if (!isElementFocusZone(child)) {
        // If the item is explicitly set to not be focusable then TABINDEX needs to be set to -1.
        if (child.getAttribute && child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'false') {
          child.setAttribute(TABINDEX, '-1')
        }

        if (isElementTabbable(child)) {
          if (this.props.disabled) {
            child.setAttribute(TABINDEX, '-1')
          } else if (
            !this._isInnerZone &&
            ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)
          ) {
            this._defaultFocusElement = child
            if (child.getAttribute(TABINDEX) !== '0') {
              child.setAttribute(TABINDEX, '0')
            }
          } else if (child.getAttribute(TABINDEX) !== '-1') {
            child.setAttribute(TABINDEX, '-1')
          }
        } else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
          // Disgusting IE hack. Sad face.
          child.setAttribute('focusable', 'false')
        }
      } else if (child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true') {
        if (
          !this._isInnerZone &&
          ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)
        ) {
          this._defaultFocusElement = child
          if (child.getAttribute(TABINDEX) !== '0') {
            child.setAttribute(TABINDEX, '0')
          }
        } else if (child.getAttribute(TABINDEX) !== '-1') {
          child.setAttribute(TABINDEX, '-1')
        }
      }

      this.updateTabIndexes(child)
    }
  }

  private isElementInput(element: HTMLElement): boolean {
    if (
      element &&
      element.tagName &&
      (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')
    ) {
      return true
    }
    return false
  }

  private shouldInputLoseFocus(element: HTMLInputElement, isForward?: boolean) {
    // If a tab was used, we want to focus on the next element.
    if (
      !this._processingTabKey &&
      element &&
      element.type &&
      ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1
    ) {
      const selectionStart = element.selectionStart
      const selectionEnd = element.selectionEnd
      const isRangeSelected = selectionStart !== selectionEnd
      const inputValue = element.value

      // We shouldn't lose focus in the following cases:
      // 1. There is range selected.
      // 2. When selection start is larger than 0 and it is backward.
      // 3. when selection start is not the end of length and it is forward.
      // 4. We press any of the arrow keys when our handleTabKey isn't none or undefined (only losing focus if we hit tab)
      // and if shouldInputLoseFocusOnArrowKey is defined, if scenario prefers to not loose the focus which is determined by calling the
      // callback shouldInputLoseFocusOnArrowKey
      if (
        isRangeSelected ||
        (selectionStart! > 0 && !isForward) ||
        (selectionStart !== inputValue.length && isForward) ||
        (!!this.props.handleTabKey &&
          !(
            this.props.shouldInputLoseFocusOnArrowKey &&
            this.props.shouldInputLoseFocusOnArrowKey(element)
          ))
      ) {
        return false
      }
    }

    return true
  }
}
