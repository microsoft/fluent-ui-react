import * as React from 'react'
import { createPortal } from 'react-dom'
import * as PropTypes from 'prop-types'
import _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'

import {
  childrenExist,
  AutoControlledComponent,
  EventStack,
  RenderResultConfig,
  isBrowser,
} from '../../lib'
import { ComponentEventHandler, Extendable } from '../../../types/utils'

import Ref from '../Ref/Ref'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

import { popupBehavior } from '../../lib/accessibility'
import {
  Accessibility,
  AccessibilityActionHandlers,
  AccessibilityBehavior,
} from '../../lib/accessibility/types'
import { ChildrenComponentProps, ContentComponentProps } from '../../lib/commonPropInterfaces'
import { contentComponentPropsTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface PopupProps extends ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default popupBehavior
   * */
  accessibility?: Accessibility

  /** Alignment for the popup. */
  align?: Alignment

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Defines whether popup is displayed. */
  open?: boolean

  /**
   * Event for request to change 'open' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>

  /**
   * Position for the popup. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Initial value for 'target'. */
  defaultTarget?: HTMLElement

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element
}

export interface PopupState {
  open: boolean
  target: HTMLElement
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends AutoControlledComponent<Extendable<PopupProps>, PopupState> {
  public static displayName = 'Popup'

  public static className = 'ui-popup'

  public static Content = PopupContent

  public static propTypes = {
    ...contentComponentPropsTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    align: PropTypes.oneOf(ALIGNMENTS),
    className: PropTypes.string,
    defaultOpen: PropTypes.bool,
    defaultTarget: PropTypes.any,
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    position: PropTypes.oneOf(POSITIONS),
    target: PropTypes.any,
    trigger: PropTypes.any,
  }

  public static defaultProps: PopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    position: 'above',
  }

  public static autoControlledProps = ['open', 'target']

  private static isBrowserContext = isBrowser()

  private outsideClickSubscription = EventStack.noSubscription

  private triggerDomElement = null
  private popupDomElement = null

  protected actionHandlers: AccessibilityActionHandlers = {
    toggle: e => {
      this.trySetOpen(!this.state.open, e, true)
    },
    closeAndFocusTrigger: e => this.closeAndFocusTrigger(e),
  }

  private closeAndFocusTrigger = e => {
    if (this.state.open) {
      this.trySetOpen(false, e, true)
      _.invoke(this.triggerDomElement, 'focus')
    }
  }

  private updateOutsideClickSubscription() {
    this.outsideClickSubscription.unsubscribe()

    if (this.state.open) {
      setTimeout(() => {
        this.outsideClickSubscription = EventStack.subscribe('click', e => {
          if (!this.popupDomElement || !this.popupDomElement.contains(e.target)) {
            this.closeAndFocusTrigger(e)
          }
        })
      })
    }
  }

  public state = { target: undefined, open: false }

  public componentDidMount() {
    this.updateOutsideClickSubscription()

    if (!this.state.open) {
      this.popupDomElement = null
    }
  }

  public componentDidUpdate() {
    this.updateOutsideClickSubscription()

    if (!this.state.open) {
      this.popupDomElement = null
    }
  }

  public componentWillUnmount() {
    this.outsideClickSubscription.unsubscribe()
  }

  public renderComponent({ rtl, accessibility }: RenderResultConfig<PopupProps>): React.ReactNode {
    const popupContent = this.renderPopupContent(rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}

        {this.state.open &&
          Popup.isBrowserContext &&
          popupContent &&
          createPortal(popupContent, document.body)}
      </>
    )
  }

  private renderTrigger(accessibility) {
    const { children, trigger } = this.props
    const triggerElement = childrenExist(children) ? children : (trigger as any)

    return (
      triggerElement && (
        <Ref
          innerRef={domNode => {
            this.trySetState({ target: domNode })
            this.triggerDomElement = domNode
          }}
        >
          {React.cloneElement(triggerElement, {
            onClick: e => {
              this.trySetOpen(!this.state.open, e)
              _.invoke(triggerElement, 'props.onClick', e)
            },
            ...accessibility.attributes.trigger,
            ...accessibility.keyHandlers.trigger,
          })}
        </Ref>
      )
    )
  }

  private renderPopupContent(rtl: boolean, accessibility: AccessibilityBehavior): JSX.Element {
    const { align, position } = this.props
    const { target } = this.state

    const placement = computePopupPlacement({ align, position, rtl })

    return (
      target && (
        <Popper
          placement={placement}
          referenceElement={target}
          children={this.renderPopperChildren.bind(this, rtl, accessibility)}
        />
      )
    )
  }

  private renderPopperChildren = (
    rtl: boolean,
    accessibility: AccessibilityBehavior,
    { ref, style: popupPlacementStyles }: PopperChildrenProps,
  ) => {
    const { content } = this.props

    return (
      <Ref
        innerRef={domElement => {
          ref(domElement)
          this.popupDomElement = domElement
        }}
      >
        {Popup.Content.create(content, {
          defaultProps: {
            ...(rtl && { dir: 'rtl' }),
            style: popupPlacementStyles,
            ...accessibility.attributes.popup,
            ...accessibility.keyHandlers.popup,
          },
        })}
      </Ref>
    )
  }

  private trySetOpen(newValue: boolean, eventArgs: any, forceChangeEvent: boolean = false) {
    if (this.trySetState({ open: newValue }) || forceChangeEvent) {
      _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } })
    }
  }
}
