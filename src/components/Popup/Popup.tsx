import * as React from 'react'
import { createPortal } from 'react-dom'
import * as PropTypes from 'prop-types'
import _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'

import {
  childrenExist,
  customPropTypes,
  AutoControlledComponent,
  EventStack,
  RenderResultConfig,
  isBrowser,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  Extendable,
  ReactChildren,
} from '../../../types/utils'

import Ref from '../Ref/Ref'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

import { popupBehavior } from '../../lib/accessibility'
import { FocusTrapZone, FocusTrapZoneProps } from '../../lib/accessibility/FocusZone'

import {
  Accessibility,
  AccessibilityActionHandlers,
  AccessibilityBehavior,
} from '../../lib/accessibility/types'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface PopupProps {
  accessibility?: Accessibility
  align?: Alignment
  children?: ReactChildren
  className?: string
  content?: ShorthandValue
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: ComponentEventHandler<PopupProps>
  position?: Position
  target?: HTMLElement
  defaultTarget?: HTMLElement
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
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Alignment for the popup. */
    align: PropTypes.oneOf(ALIGNMENTS),

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The popup content. */
    content: customPropTypes.itemShorthand,

    /** Initial value for 'open'. */
    defaultOpen: PropTypes.bool,

    /** Initial value for 'target'. */
    defaultTarget: PropTypes.any,

    /** Defines whether popup is displayed. */
    open: PropTypes.bool,

    /**
     * Event for request to change 'open' value.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onOpenChange: PropTypes.func,

    /**
     * Position for the popup. Position has higher priority than align. If position is vertical ('above' | 'below')
     * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
     * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
     */
    position: PropTypes.oneOf(POSITIONS),

    /**
     * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
     */
    target: PropTypes.any,

    /** Element to be rendered in-place where the popup is defined. */
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

  public renderComponent({
    classes,
    rtl,
    accessibility,
  }: RenderResultConfig<PopupProps>): React.ReactNode {
    const popupContent = this.renderPopupContent(classes.popup, rtl, accessibility)

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

  private renderPopupContent(
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: AccessibilityBehavior,
  ): JSX.Element {
    const { align, position } = this.props
    const { target } = this.state

    const placement = computePopupPlacement({ align, position, rtl })

    return (
      target && (
        <Popper
          placement={placement}
          referenceElement={target}
          children={this.renderPopperChildren.bind(this, popupPositionClasses, rtl, accessibility)}
        />
      )
    )
  }

  private renderPopperChildren = (
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: AccessibilityBehavior,
    { ref, style: popupPlacementStyles }: PopperChildrenProps,
  ) => {
    const { content } = this.props

    const popupContentAttributes = {
      ...(rtl && { dir: 'rtl' }),
      ...accessibility.attributes.popup,
      ...accessibility.keyHandlers.popup,

      className: popupPositionClasses,
      style: popupPlacementStyles,
    }

    const focusTrapProps = {
      ...(typeof accessibility.focusTrapZone === 'boolean' ? {} : accessibility.focusTrapZone),
      ...popupContentAttributes,
    } as FocusTrapZoneProps

    const popupContent = Popup.Content.create(content, {
      /**
       * if there is no focus trap wrapper, we should apply
       * HTML attributes and positioning to popup content directly
       */
      defaultProps: accessibility.focusTrapZone ? {} : popupContentAttributes,
    })

    return (
      <Ref
        innerRef={domElement => {
          ref(domElement)
          this.popupDomElement = domElement
        }}
      >
        {accessibility.focusTrapZone ? (
          <FocusTrapZone {...focusTrapProps}>{popupContent}</FocusTrapZone>
        ) : (
          popupContent
        )}
      </Ref>
    )
  }

  private trySetOpen(newValue: boolean, eventArgs: any, forceChangeEvent: boolean = false) {
    if (this.trySetState({ open: newValue }) || forceChangeEvent) {
      _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } })
    }
  }
}
