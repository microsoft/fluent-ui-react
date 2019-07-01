import { EventListener } from '@stardust-ui/react-component-event-listener'
import { NodeRef, Unstable_NestingAuto } from '@stardust-ui/react-component-nesting-registry'
import { handleRef, toRefObject, Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

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
  doesNodeContainClick,
  setWhatInputSource,
} from '../../lib'
import { ComponentEventHandler, ShorthandValue } from '../../types'
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  PositioningProps,
  PopperChildrenProps,
} from '../../lib/positioner'
import PopupContent from './PopupContent'
import { popupBehavior } from '../../lib/accessibility'
import {
  AutoFocusZone,
  AutoFocusZoneProps,
  FocusTrapZone,
  FocusTrapZoneProps,
} from '../../lib/accessibility/FocusZone'

import { Accessibility } from '../../lib/accessibility/types'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'
import { createShorthandFactory } from '../../lib/factories'

export type PopupEvents = 'click' | 'hover' | 'focus' | 'context'
export type RestrictedClickEvents = 'click' | 'focus'
export type RestrictedHoverEvents = 'hover' | 'focus' | 'context'
export type PopupEventsArray = RestrictedClickEvents[] | RestrictedHoverEvents[]

export interface PopupSlotClassNames {
  content: string
}

export interface PopupProps
  extends StyledComponentProps<PopupProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue>,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default popupBehavior
   * @available popupFocusTrapBehavior, dialogBehavior
   * */
  accessibility?: Accessibility

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Whether the Popup should be rendered inline with the trigger or in the body. */
  inline?: boolean

  /** Existing document the popup should add listeners. */
  mountDocument?: Document

  /** Existing element the popup should be bound to. */
  mountNode?: HTMLElement

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number

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
   * Function to render popup content.
   * @param {Function} updatePosition - function to request popup position update.
   */
  renderContent?: (updatePosition: Function) => ShorthandValue

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element

  /** should trigger be made tabbable */
  shouldTriggerBeTabbable?: boolean

  /** Ref for Popup content DOM node. */
  contentRef?: React.Ref<HTMLElement>
}

export interface PopupState {
  open: boolean
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility
 * Do use popupFocusTrapBehavior if the focus needs to be trapped inside of the Popup.
 * If Popup's content is lazy loaded and focus needs to be trapped inside - make sure to use state change to trigger componentDidUpdate,
 * so the focus can be set correctly to the first tabbable element inside Popup or manually set focus to the element inside once content is loaded.
 */
export default class Popup extends AutoControlledComponent<PopupProps, PopupState> {
  static displayName = 'Popup'

  static className = 'ui-popup'

  static create: Function

  static slotClassNames: PopupSlotClassNames = {
    content: `${Popup.className}__content`,
  }

  static Content = PopupContent

  static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: false,
      content: false,
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    inline: PropTypes.bool,
    mountDocument: PropTypes.object,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.string,
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus', 'context']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus', 'context'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'context'])),
    ]),
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    renderContent: PropTypes.func,
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    shouldTriggerBeTabbable: PropTypes.bool,
    unstable_pinned: PropTypes.bool,
    content: customPropTypes.shorthandAllowingChildren,
    contentRef: customPropTypes.ref,
  }

  static defaultProps: PopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    mountDocument: isBrowser() ? document : null,
    mountNode: isBrowser() ? document.body : null,
    position: 'above',
    on: 'click',
    mouseLeaveDelay: 500,
    shouldTriggerBeTabbable: true,
  }

  static autoControlledProps = ['open']

  pointerTargetRef = React.createRef<HTMLElement>()
  triggerRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  // focusable element which has triggered Popup, can be either triggerDomElement or the element inside it
  triggerFocusableDomElement = null
  popupDomElement = null
  rightClickReferenceObject = null

  closeTimeoutId

  actionHandlers = {
    closeAndFocusTrigger: e => {
      this.close(e, () => _.invoke(this.triggerFocusableDomElement, 'focus'))
    },
    close: e => {
      this.close(e)
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
    const { inline, mountNode } = this.props
    const { open } = this.state
    const popupContent = open && this.renderPopupContent(classes.popup, rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}
        {open &&
          (inline ? popupContent : mountNode && ReactDOM.createPortal(popupContent, mountNode))}
      </>
    )
  }

  handleDocumentClick = (getRefs: Function) => e => {
    if (this.rightClickReferenceObject && this.isOutsidePopupElement(getRefs(), e)) {
      this.trySetOpen(false, e)
      return
    }

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
    const isOutsidePopupElement = this.isOutsidePopupElement(refs, e)
    const isOutsideTriggerElement =
      this.triggerRef.current && !doesNodeContainClick(this.triggerRef.current, e)

    return isOutsidePopupElement && isOutsideTriggerElement
  }

  isOutsidePopupElement(refs: NodeRef[], e) {
    const isInsideNested = _.some(refs, (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current, e)
    })

    const isOutsidePopupElement = this.popupDomElement && !isInsideNested
    return isOutsidePopupElement
  }

  getTriggerProps(triggerElement) {
    const triggerProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus, blur and click event (always opening on click)
     * If focus and context are provided, there is no need to add onClick
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
      if (!_.includes(normalizedOn, 'context')) {
        triggerProps.onClick = (e, ...args) => {
          this.setPopupOpen(true, e)
          _.invoke(triggerElement, 'props.onClick', e, ...args)
        }
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
     * The context is opening the popup
     */
    if (_.includes(normalizedOn, 'context')) {
      triggerProps.onContextMenu = (e, ...args) => {
        this.setPopupOpen(true, e)
        _.invoke(triggerElement, 'props.onContextMenu', e, ...args)
        e.preventDefault()
      }
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave, blur and click event (always opening on click)
     * If hover and context are provided, there is no need to add onClick
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
      if (!_.includes(normalizedOn, 'context')) {
        triggerProps.onClick = (e, ...args) => {
          this.setPopupOpen(true, e)
          _.invoke(triggerElement, 'props.onClick', e, ...args)
        }
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
    const contentHandlerProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus and blur events on the content
     */
    if (_.includes(normalizedOn, 'focus')) {
      contentHandlerProps.onFocus = (e, contentProps) => {
        this.trySetOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onFocus', e, contentProps)
      }
      contentHandlerProps.onBlur = (e, contentProps) => {
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
      contentHandlerProps.onMouseEnter = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseEnter', e, contentProps)
      }
      contentHandlerProps.onMouseLeave = (e, contentProps) => {
        this.setPopupOpen(false, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseLeave', e, contentProps)
      }
      contentHandlerProps.onClick = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onClick', e, contentProps)
      }
    }

    return contentHandlerProps
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
        <Ref innerRef={this.triggerRef}>
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
    accessibility: ReactAccessibilityBehavior,
  ): JSX.Element {
    const { align, position, offset, target, unstable_pinned } = this.props

    return (
      <Popper
        pointerTargetRef={this.pointerTargetRef}
        align={align}
        position={position}
        offset={offset}
        rtl={rtl}
        unstable_pinned={unstable_pinned}
        targetRef={target ? toRefObject(target) : this.triggerRef}
        referenceObject={this.rightClickReferenceObject}
        children={this.renderPopperChildren.bind(this, popupPositionClasses, rtl, accessibility)}
      />
    )
  }

  renderPopperChildren = (
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
    { placement, scheduleUpdate }: PopperChildrenProps,
  ) => {
    const { content: propsContent, renderContent, contentRef, mountDocument, pointing } = this.props
    const content = renderContent ? renderContent(scheduleUpdate) : propsContent
    const documentRef = toRefObject(mountDocument)

    const popupWrapperAttributes = {
      ...(rtl && { dir: 'rtl' }),
      ...accessibility.attributes.popup,
      ...accessibility.keyHandlers.popup,
      className: popupPositionClasses,
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
        pointerRef: this.pointerTargetRef,
        unstable_wrapped: accessibility.focusTrap || accessibility.autoFocus,
      },
      overrideProps: this.getContentProps,
    })

    return (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={domElement => {
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
              capture
            />
            <EventListener
              listener={this.handleDocumentKeyDown(getRefs)}
              targetRef={documentRef}
              type="keydown"
              capture
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
      this.updateContextPosition(eventArgs.nativeEvent)
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
      e.stopPropagation()
    }
  }

  /**
   * Save DOM element which had focus before Popup opens.
   * Can be either trigger DOM element itself or the element inside it.
   */
  updateTriggerFocusableDomElement() {
    const { mountDocument } = this.props
    const activeElement = mountDocument.activeElement

    this.triggerFocusableDomElement = this.triggerRef.current.contains(activeElement)
      ? activeElement
      : this.triggerRef.current
  }

  updateContextPosition(nativeEvent: MouseEvent) {
    if (!nativeEvent || nativeEvent.which !== 3) {
      this.rightClickReferenceObject = null
      return
    }

    const left = nativeEvent.clientX
    const top = nativeEvent.clientY
    const right = left + 1
    const bottom = top + 1

    function getBoundingClientRect() {
      return {
        left,
        top,
        right,
        bottom,
      }
    }

    this.rightClickReferenceObject = {
      getBoundingClientRect,
      clientWidth: 1,
      clientHeight: 1,
    }
  }
}

Popup.create = createShorthandFactory({ Component: Popup, mappedProp: 'content' })
