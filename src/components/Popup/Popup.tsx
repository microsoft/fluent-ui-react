import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import CSSProperties = React.CSSProperties

import { childrenExist, customPropTypes, isBrowser } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { ItemShorthand, Extendable } from '../../../types/utils'
import { IPortalGenericProps, IPortalGenericState, PortalGeneric } from '../Portal'
import PopupContent from './PopupContent'
import { PopupBehavior } from '../../lib/accessibility'
import {
  Accessibility,
  AccessibilityActions,
  IAccessibilityBehavior,
} from '../../lib/accessibility/interfaces'
import getKeyDownHandlers from '../../lib/getKeyDownHandlers'
import callable from '../../lib/callable'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/FocusZone/FocusUtilities'

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

export interface IPopupProps extends IPortalGenericProps {
  as?: any
  basic?: boolean
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: PopupPosition
  style?: CSSProperties
  trigger: JSX.Element
  focusableSelector?: string
}

export interface IPopupState extends IPortalGenericState {
  style?: CSSProperties
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends PortalGeneric<Extendable<IPopupState>, IPopupState> {
  private popupOffset = 8
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

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,

    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    focusableSelector: PropTypes.string,
  }

  public static defaultProps = {
    position: 'top start',
  }

  public state = { style: {}, open: false }

  actions: AccessibilityActions = {
    openAndFocus: () => this.open(this.focus),
    openAndFocusLast: () => this.open(this.focusLast),
    close: () => this.close(() => this.triggerNode.focus()),
  }

  public render() {
    const { basic, children, content, trigger } = this.props
    const { style } = this.state

    const accessibilityBehavior = this.getAccessibility(this.props, this.state, this.actions)

    const portalContent = (
      <Popup.Content
        basic={basic}
        triggerRef={this.handlePopupRef}
        styles={{ root: style }}
        {...accessibilityBehavior.attributes.popup}
        {...accessibilityBehavior.handlers.popup}
      >
        {childrenExist(children) ? children : content}
      </Popup.Content>
    )

    return (
      <React.Fragment>
        {this.renderPortal(portalContent)}
        {this.renderTrigger(trigger, {
          ...accessibilityBehavior.attributes.popup,
          ...accessibilityBehavior.handlers.trigger,
        })}
      </React.Fragment>
    )
  }

  private focus = () => {
    if (!this.portalNode) return
    const focusableElement = (this.getFocusableElementBySelector(this.props.focusableSelector) ||
      this.portalNode.querySelector(`[${IS_FOCUSABLE_ATTRIBUTE}="true"]`)) as HTMLElement

    focusableElement && focusableElement.focus()
  }

  private focusLast = () => {
    if (!this.portalNode) return

    let focusableElement

    const focusableElementBySelector = this.getFocusableElementBySelector(
      this.props.focusableSelector,
    ) as HTMLElement

    if (focusableElementBySelector) {
      focusableElementBySelector.focus()
    } else {
      const allFocusableElements = this.portalNode.querySelectorAll(
        `[${IS_FOCUSABLE_ATTRIBUTE}="true"]`,
      )
      focusableElement = allFocusableElements[allFocusableElements.length - 1] as HTMLElement

      focusableElement && focusableElement.focus()
    }
  }

  private getFocusableElementBySelector = (selector?: string) => {
    if (!selector) return null

    return this.portalNode.querySelector(selector)
  }

  private setPopupStyle() {
    const style = this.computePopupStyle()

    if (!_.isEmpty(style)) {
      this.setState({ style })
    }
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

  protected handleMount = () => {
    super.handleMount()
    this.setPopupStyle()
  }

  protected handleUnmount = () => {
    super.handleUnmount()
  }

  private handlePopupRef = (popupRef: HTMLElement) => {
    this.popupCoords = popupRef && popupRef.getBoundingClientRect()
    this.setPopupStyle()
  }

  private getContext = (): HTMLElement => this.triggerNode

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
}
