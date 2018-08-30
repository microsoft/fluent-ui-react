import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import CSSProperties = React.CSSProperties

import { childrenExist, customPropTypes, isBrowser } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { ItemShorthand, Extendable } from '../../../types/utils'
import Portal from '../Portal'
import PopupContent from './PopupContent'

import { PopupBehavior } from '../../lib/accessibility'
import Ref from '../Ref'
import {
  Accessibility,
  AccessibilityActions,
  IAccessibilityBehavior,
} from '../../lib/accessibility/interfaces'
import getKeyDownHandlers from '../../lib/getKeyDownHandlers'
import callable from '../../lib/callable'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/interfaces'

type PopupPosition =
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'start center'
  | 'end center'
  | 'top center'
  | 'bottom center'

const POSITIONS: PopupPosition[] = [
  'top start',
  'top end',
  'bottom start',
  'bottom end',
  'start center',
  'end center',
  'top center',
  'bottom center',
]

export interface IPopupProps {
  as?: any
  basic?: boolean
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: PopupPosition
  style?: CSSProperties
  trigger: JSX.Element
  focusableSelector?: string
}

export interface IPopupState {
  style?: CSSProperties
  open: boolean
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends React.Component<Extendable<IPopupProps>, IPopupState> {
  private popupOffset = 8
  private triggerRef: HTMLElement
  private popupRef: HTMLElement
  private popupCoords: ClientRect | DOMRect | undefined

  public static Content = PopupContent

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Basic CSS styling for the popup */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Simple text content for the popover. */
    content: customPropTypes.itemShorthand,

    /** Position for the popup. */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node.isRequired,

    /** Custom style to be applied for component. */
    style: PropTypes.object,

    /** Selector of an element to be focused right after popup was opened */
    focusableSelector: PropTypes.string,
  }

  public static defaultProps = {
    position: 'top start',
  }

  public state = { style: {}, open: false }

  actions: AccessibilityActions = {
    openAndFocus: () => this.openPopup(this.focus),
    openAndFocusLast: () => this.openPopup(this.focusLast),
    close: () => this.closePopup(),
  }

  public render() {
    const { basic, children, content, trigger } = this.props
    const { style, open } = this.state
    const accessibilityBehavior = this.getAccessibility(this.props, this.state, this.actions)
    return (
      <React.Fragment>
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: this.handleTriggerClick,
            ...accessibilityBehavior.attributes.trigger,
            ...accessibilityBehavior.handlers.trigger,
          })}
        </Ref>
        <Portal onMount={this.handlePortalMount} open={open}>
          <Popup.Content
            basic={basic}
            triggerRef={this.handlePopupRef}
            styles={{ root: style }}
            {...accessibilityBehavior.attributes.popup}
            {...accessibilityBehavior.handlers.popup}
          >
            {childrenExist(children) ? children : content}
          </Popup.Content>
        </Portal>
      </React.Fragment>
    )
  }

  handleTriggerClick = () => {
    this.setState({ open: !this.state.open })
  }

  private openPopup = (afterRenderClbk?: Function) => {
    this.setState({ open: true }, () => {
      afterRenderClbk && afterRenderClbk()
    })
  }

  private closePopup = () => {
    this.setState({ open: false }, () => {
      this.triggerRef.focus()
    })
  }

  private focus = () => {
    if (!this.popupRef) return
    const focusableElement = (this.getFocusableElementBySelector(this.props.focusableSelector) ||
      this.popupRef.querySelector(`[${IS_FOCUSABLE_ATTRIBUTE}="true"]`)) as HTMLElement

    focusableElement && focusableElement.focus()
  }

  private focusLast = () => {
    if (!this.popupRef) return

    let focusableElement

    const focusableElementBySelector = this.getFocusableElementBySelector(
      this.props.focusableSelector,
    ) as HTMLElement

    if (focusableElementBySelector) {
      focusableElementBySelector.focus()
    } else {
      const allFocusableElements = this.popupRef.querySelectorAll(
        `[${IS_FOCUSABLE_ATTRIBUTE}="true"]`,
      )
      focusableElement = allFocusableElements[allFocusableElements.length - 1] as HTMLElement

      focusableElement && focusableElement.focus()
    }
  }

  private getFocusableElementBySelector = (selector?: string) => {
    if (!selector) return null

    return this.popupRef.querySelector(selector)
  }

  private computePopupStyle(): CSSProperties {
    const style: CSSProperties = {}
    const popupCoords = this.popupCoords

    if (!isBrowser() || !popupCoords) {
      return style
    }

    const context = this.getContext()
    const coords = context && context.getBoundingClientRect()
    if (!coords) {
      return style
    }

    const { pageYOffset, pageXOffset } = window
    const { clientWidth, clientHeight } = document.documentElement
    const { position } = this.props
    const popupOffset = this.props.basic ? 0 : this.popupOffset

    if (_.includes(position, 'end')) {
      style.right = Math.round(clientWidth - (coords.right + pageXOffset))
    } else if (_.includes(position, 'start')) {
      style.left = Math.round(coords.left + pageXOffset)
    } else {
      // if not start nor end, we are horizontally centering the element
      const xOffset = (coords.width - popupCoords.width) / 2
      style.left = Math.round(coords.left + xOffset + pageXOffset)
    }

    if (_.includes(position, 'top')) {
      style.bottom = Math.round(clientHeight - (coords.top + pageYOffset)) + popupOffset
    } else if (_.includes(position, 'bottom')) {
      style.top = Math.round(coords.bottom + pageYOffset) + popupOffset
    } else {
      // if not top nor bottom, we are vertically centering the element
      const yOffset = (coords.height + popupCoords.height) / 2
      style.top = Math.round(coords.bottom + pageYOffset - yOffset)

      const xOffset = popupCoords.width + popupOffset
      if (_.includes(position, 'end')) {
        style.right = (style.right as number) - xOffset
      } else {
        style.left = (style.left as number) - xOffset
      }
    }

    // Append 'px' to every numerical values in the style
    return _.mapValues(style, value => (_.isNumber(value) ? `${value}px` : value))
  }

  private setPopupStyle() {
    const style = this.computePopupStyle()

    if (!_.isEmpty(style)) {
      this.setState({ style })
    }
  }

  private handlePortalMount = () => {
    this.setPopupStyle()
  }

  private handlePopupRef = (popupRef: HTMLElement) => {
    this.popupRef = popupRef
    this.popupCoords = popupRef && popupRef.getBoundingClientRect()
    this.setPopupStyle()
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => {
    this.triggerRef = triggerRef
  }

  private getAccessibility = (props, state, actions) => {
    const accessibility = callable(PopupBehavior)({
      ...props,
      ...state,
    })

    const handlers = getKeyDownHandlers(actions, accessibility, props)
    return {
      ...accessibility,
      handlers,
    }
  }

  private getContext = (): HTMLElement => this.triggerRef
}
