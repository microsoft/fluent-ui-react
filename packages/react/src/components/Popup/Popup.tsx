import { documentRef, EventListener } from '@stardust-ui/react-component-event-listener'
import { NodeRef, Unstable_NestingAuto } from '@stardust-ui/react-component-nesting-registry'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'

import {
  applyAccessibilityKeyHandlers,
  childrenExist,
  AutoControlledComponent,
  RenderResultConfig,
  isBrowser,
  ChildrenComponentProps,
  ContentComponentProps,
  StyledComponentProps,
  commonPropTypes,
  isFromKeyboard,
  handleRef,
  doesNodeContainClick,
  setWhatInputSource,
} from '../../lib'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../types'

import Ref from '../Ref/Ref'
import { getPopupPlacement, applyRtlToOffset, Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

import { popupBehavior } from '../../lib/accessibility'
import {
  AutoFocusZone,
  AutoFocusZoneProps,
  FocusTrapZone,
  FocusTrapZoneProps,
} from '../../lib/accessibility/FocusZone'

import {
  Accessibility,
  AccessibilityActionHandlers,
  AccessibilityBehavior,
} from '../../lib/accessibility/types'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export type PopupEvents = 'click' | 'hover' | 'focus'
export type RestrictedClickEvents = 'click' | 'focus'
export type RestrictedHoverEvents = 'hover' | 'focus'
export type PopupEventsArray = RestrictedClickEvents[] | RestrictedHoverEvents[]

export interface PopupSlotClassNames {
  content: string
}

export interface PopupProps
  extends StyledComponentProps<PopupProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default popupBehavior
   * @available popupFocusTrapBehavior, dialogBehavior
   * */
  accessibility?: Accessibility

  /** Alignment for the popup. */
  align?: Alignment

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Whether the Popup should be rendered inline with the trigger or in the body. */
  inline?: boolean

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number

  /** Offset value to apply to rendered popup. Accepts the following units:
   * - px or unit-less, interpreted as pixels
   * - %, percentage relative to the length of the trigger element
   * - %p, percentage relative to the length of the popup element
   * - vw, CSS viewport width unit
   * - vh, CSS viewport height unit
   */
  offset?: string

  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray

  /** Defines whether popup is displayed. */
  open?: boolean

  /**
   * Event for request to change 'open' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>

  /** A popup can show a pointer to trigger. */
  pointing?: boolean

  /**
   * Position for the popup. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position

  /**
   * Function to render popup content.
   * @param {Function} updatePosition - function to request popup position update.
   */
  renderContent?: (updatePosition: Function) => ShorthandValue

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Initial value for 'target'. */
  defaultTarget?: HTMLElement

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element

  /** Ref for Popup content DOM node. */
  contentRef?: React.Ref<HTMLElement>
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
export default class Popup extends AutoControlledComponent<ReactProps<PopupProps>, PopupState> {
  static displayName = 'Popup'

  static className = 'ui-popup'

  static slotClassNames: PopupSlotClassNames = {
    content: `${Popup.className}__content`,
  }

  static Content = PopupContent

  static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: false,
      content: 'shorthand',
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    defaultTarget: PropTypes.any,
    inline: PropTypes.bool,
    mouseLeaveDelay: PropTypes.number,
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus'])),
    ]),
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    renderContent: PropTypes.func,
    target: PropTypes.any,
    trigger: PropTypes.any,
    contentRef: customPropTypes.ref,
  }

  static defaultProps: PopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    position: 'above',
    on: 'click',
    mouseLeaveDelay: 500,
  }

  static autoControlledProps = ['open', 'target']

  static isBrowserContext = isBrowser()

  triggerDomElement = null
  // focusable element which has triggered Popup, can be either triggerDomElement or the element inside it
  triggerFocusableDomElement = null
  popupDomElement = null

  closeTimeoutId

  protected actionHandlers: AccessibilityActionHandlers = {
    closeAndFocusTrigger: e => {
      this.close(e, () => _.invoke(this.triggerFocusableDomElement, 'focus'))
      e.stopPropagation()
    },
    close: e => {
      this.close(e)
      e.stopPropagation()
    },
    toggle: e => {
      e.preventDefault()
      this.trySetOpen(!this.state.open, e)
    },
    open: e => {
      e.preventDefault()
      this.setPopupOpen(true, e)
    },
  }

  renderComponent({
    classes,
    rtl,
    accessibility,
  }: RenderResultConfig<PopupProps>): React.ReactNode {
    const { inline } = this.props
    const popupContent = this.renderPopupContent(classes.popup, rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}

        {this.state.open &&
          Popup.isBrowserContext &&
          popupContent &&
          (inline ? popupContent : ReactDOM.createPortal(popupContent, document.body))}
      </>
    )
  }

  handleDocumentClick = (getRefs: Function) => e => {
    if (this.isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      this.trySetOpen(false, e)
    }
  }

  handleDocumentKeyDown = (getRefs: Function) => (e: KeyboardEvent) => {
    const keyCode = keyboardKey.getCode(e)
    const isMatchingKey = keyCode === keyboardKey.Enter || keyCode === keyboardKey.Spacebar

    if (isMatchingKey && this.isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      this.trySetOpen(false, e)
    }
  }

  isOutsidePopupElementAndOutsideTriggerElement(refs: NodeRef[], e) {
    const isInsideNested = _.some(refs, (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current, e)
    })

    const isOutsidePopupElement = this.popupDomElement && !isInsideNested
    const isOutsideTriggerElement =
      this.triggerDomElement && !doesNodeContainClick(this.triggerDomElement, e)

    return isOutsidePopupElement && isOutsideTriggerElement
  }

  getTriggerProps(triggerElement) {
    const triggerProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus, blur and click event (always opening on click)
     */
    if (_.includes(normalizedOn, 'focus')) {
      triggerProps.onFocus = (e, ...args) => {
        if (isFromKeyboard()) {
          this.trySetOpen(true, e)
        }
        _.invoke(triggerElement, 'props.onFocus', e, ...args)
      }
      triggerProps.onBlur = (e, ...args) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args)
      }
      triggerProps.onClick = (e, ...args) => {
        this.setPopupOpen(true, e)
        _.invoke(triggerElement, 'props.onClick', e, ...args)
      }
    }

    /**
     * The click is toggling the open state of the popup
     */
    if (_.includes(normalizedOn, 'click')) {
      triggerProps.onClick = (e, ...args) => {
        this.trySetOpen(!this.state.open, e)
        _.invoke(triggerElement, 'props.onClick', e, ...args)
      }
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave, blur and click event (always opening on click)
     */
    if (_.includes(normalizedOn, 'hover')) {
      triggerProps.onMouseEnter = (e, ...args) => {
        this.setPopupOpen(true, e)
        setWhatInputSource('mouse')
        _.invoke(triggerElement, 'props.onMouseEnter', e, ...args)
      }
      triggerProps.onMouseLeave = (e, ...args) => {
        this.setPopupOpen(false, e)
        _.invoke(triggerElement, 'props.onMouseLeave', e, ...args)
      }
      triggerProps.onClick = (e, ...args) => {
        this.setPopupOpen(true, e)
        _.invoke(triggerElement, 'props.onClick', e, ...args)
      }
      triggerProps.onBlur = (e, ...args) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args)
      }
    }

    return triggerProps
  }

  getContentProps = (predefinedProps?) => {
    const contentProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus and blur events on the content
     */
    if (_.includes(normalizedOn, 'focus')) {
      contentProps.onFocus = (e, contentProps) => {
        this.trySetOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onFocus', e, contentProps)
      }
      contentProps.onBlur = (e, contentProps) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        predefinedProps && _.invoke(predefinedProps, 'onBlur', e, contentProps)
      }
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave and click event (always opening on click)
     */
    if (_.includes(normalizedOn, 'hover')) {
      contentProps.onMouseEnter = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseEnter', e, contentProps)
      }
      contentProps.onMouseLeave = (e, contentProps) => {
        this.setPopupOpen(false, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseLeave', e, contentProps)
      }
      contentProps.onClick = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onClick', e, contentProps)
      }
    }

    return contentProps
  }

  shouldBlurClose = e => {
    return (
      !e.currentTarget ||
      !this.popupDomElement ||
      (!e.currentTarget.contains(e.relatedTarget) &&
        !this.popupDomElement.contains(e.relatedTarget))
    )
  }

  renderTrigger(accessibility) {
    const { children, trigger } = this.props
    const triggerElement = childrenExist(children) ? children : (trigger as any)
    const triggerProps = this.getTriggerProps(triggerElement)
    return (
      triggerElement && (
        <Ref
          innerRef={domNode => {
            this.trySetState({ target: domNode })
            this.triggerDomElement = domNode
          }}
        >
          {React.cloneElement(triggerElement, {
            ...accessibility.attributes.trigger,
            ...triggerProps,
            ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.trigger, triggerProps),
          })}
        </Ref>
      )
    )
  }

  renderPopupContent(
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: AccessibilityBehavior,
  ): JSX.Element {
    const { align, position, offset } = this.props
    const { target } = this.state

    const placement = getPopupPlacement({ align, position, rtl })

    const popperModifiers = {
      // https://popper.js.org/popper-documentation.html#modifiers..offset
      ...(offset && {
        offset: { offset: rtl ? applyRtlToOffset(offset, position) : offset },
        keepTogether: { enabled: false },
      }),
    }

    return (
      target && (
        <Popper
          placement={placement}
          referenceElement={target}
          children={this.renderPopperChildren.bind(this, popupPositionClasses, rtl, accessibility)}
          modifiers={popperModifiers}
        />
      )
    )
  }

  renderPopperChildren = (
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: AccessibilityBehavior,
    // https://popper.js.org/popper-documentation.html#Popper.scheduleUpdate
    {
      arrowProps,
      placement,
      ref,
      scheduleUpdate,
      style: popupPlacementStyles,
    }: PopperChildrenProps,
  ) => {
    const { content: propsContent, renderContent, contentRef, pointing } = this.props
    const content = renderContent ? renderContent(scheduleUpdate) : propsContent

    const popupWrapperAttributes = {
      ...(rtl && { dir: 'rtl' }),
      ...accessibility.attributes.popup,
      ...accessibility.keyHandlers.popup,
      className: popupPositionClasses,
      style: popupPlacementStyles,
      ...this.getContentProps(),
    }

    const focusTrapProps = {
      ...(typeof accessibility.focusTrap === 'boolean' ? {} : accessibility.focusTrap),
      ...popupWrapperAttributes,
    } as FocusTrapZoneProps

    const autoFocusProps = {
      ...(typeof accessibility.autoFocus === 'boolean' ? {} : accessibility.autoFocus),
      ...popupWrapperAttributes,
    } as AutoFocusZoneProps

    /**
     * if there is no focus trap  or auto focus wrapper, we should apply
     * HTML attributes and positioning to popup content directly
     */
    const popupContentAttributes =
      accessibility.focusTrap || accessibility.autoFocus ? {} : popupWrapperAttributes

    const popupContent = Popup.Content.create(content, {
      defaultProps: {
        ...popupContentAttributes,
        placement,
        pointing,
        pointerRef: arrowProps.ref,
        pointerStyle: arrowProps.style,
      },
      overrideProps: this.getContentProps,
    })

    return (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={domElement => {
                ref(domElement)
                this.popupDomElement = domElement
                handleRef(contentRef, domElement)
                handleRef(nestingRef, domElement)
              }}
            >
              {accessibility.focusTrap ? (
                <FocusTrapZone {...focusTrapProps}>{popupContent}</FocusTrapZone>
              ) : accessibility.autoFocus ? (
                <AutoFocusZone {...autoFocusProps}>{popupContent}</AutoFocusZone>
              ) : (
                popupContent
              )}
            </Ref>

            <EventListener
              listener={this.handleDocumentClick(getRefs)}
              targetRef={documentRef}
              type="click"
            />
            <EventListener
              listener={this.handleDocumentKeyDown(getRefs)}
              targetRef={documentRef}
              type="keydown"
            />
          </>
        )}
      </Unstable_NestingAuto>
    )
  }

  trySetOpen(newValue: boolean, eventArgs: any) {
    // when new state 'open' === 'true', save the last focused element
    if (newValue) {
      this.updateTriggerFocusableDomElement()
    }
    this.trySetState({ open: newValue })
    _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } })
  }

  setPopupOpen(newOpen, e) {
    clearTimeout(this.closeTimeoutId)
    newOpen ? this.trySetOpen(true, e) : this.schedulePopupClose(e)
  }

  schedulePopupClose = e => {
    const { mouseLeaveDelay } = this.props

    this.closeTimeoutId = setTimeout(() => {
      this.trySetOpen(false, e)
    }, mouseLeaveDelay)
  }

  close = (e, onClose?: Function) => {
    if (this.state.open) {
      this.trySetOpen(false, e)
      onClose && onClose()
    }
  }

  /**
   * Save DOM element which had focus before Popup opens.
   * Can be either trigger DOM element itself or the element inside it.
   */
  updateTriggerFocusableDomElement() {
    this.triggerFocusableDomElement = this.triggerDomElement.contains(document.activeElement)
      ? document.activeElement
      : this.triggerDomElement
  }
}
