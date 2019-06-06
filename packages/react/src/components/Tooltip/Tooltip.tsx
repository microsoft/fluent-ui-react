import { toRefObject, Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
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
  setWhatInputSource,
} from '../../lib'
import { ShorthandValue } from '../../types'
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  PositioningProps,
  PopperChildrenProps,
} from '../../lib/positioner'
import TooltipContent from './TooltipContent'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'

export interface TooltipSlotClassNames {
  content: string
}

export interface TooltipState {
  open: boolean
}

export interface TooltipProps
  extends StyledComponentProps<TooltipProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue>,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Existing element the tooltip should be bound to. */
  mountNode?: HTMLElement

  /** Delay in ms for the mouse leave event, before the tooltip will be closed. */
  mouseLeaveDelay?: number

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /**
   * Function to render tooltip content.
   * @param {Function} updatePosition - function to request tooltip position update.
   */
  renderContent?: (updatePosition: Function) => ShorthandValue

  /**
   * DOM element that should be used as tooltip's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Element to be rendered in-place where the tooltip is defined. */
  trigger?: JSX.Element
}

/**
 * A tooltip that displays information related to an element when the element receives keyboard focus
 * or the mouse hovers over it.
 */
export default class Tooltip extends AutoControlledComponent<TooltipProps, TooltipState> {
  static displayName = 'Tooltip'

  static className = 'ui-tooltip'

  static slotClassNames: TooltipSlotClassNames = {
    content: `${Tooltip.className}__content`,
  }

  static Content = TooltipContent

  static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: false,
      content: false,
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    inline: PropTypes.bool,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.string,
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    renderContent: PropTypes.func,
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    content: customPropTypes.shorthandAllowingChildren,
  }

  static defaultProps: TooltipProps = {
    align: 'start',
    mountNode: isBrowser() ? document.body : null,
    position: 'above',
    mouseLeaveDelay: 500,
  }

  static autoControlledProps = ['open']

  pointerTargetRef = React.createRef<HTMLElement>()
  triggerRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  tooltipDomElement = null

  closeTimeoutId

  renderComponent({
    classes,
    rtl,
    accessibility,
  }: RenderResultConfig<TooltipProps>): React.ReactNode {
    const { mountNode } = this.props
    const { open } = this.state
    const tooltipContent = open && this.renderTooltipContent(classes.content, rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}
        {open && mountNode && ReactDOM.createPortal(tooltipContent, mountNode)}
      </>
    )
  }

  getTriggerProps(triggerElement) {
    const triggerProps: any = {}

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

    triggerProps.onMouseEnter = (e, ...args) => {
      this.setTooltipOpen(true, e)
      setWhatInputSource('mouse')
      _.invoke(triggerElement, 'props.onMouseEnter', e, ...args)
    }
    triggerProps.onMouseLeave = (e, ...args) => {
      this.setTooltipOpen(false, e)
      _.invoke(triggerElement, 'props.onMouseLeave', e, ...args)
    }

    return triggerProps
  }

  getContentProps = (predefinedProps?) => {
    const contentHandlerProps: any = {}

    contentHandlerProps.onMouseEnter = (e, contentProps) => {
      this.setTooltipOpen(true, e)
      predefinedProps && _.invoke(predefinedProps, 'onMouseEnter', e, contentProps)
    }
    contentHandlerProps.onMouseLeave = (e, contentProps) => {
      this.setTooltipOpen(false, e)
      predefinedProps && _.invoke(predefinedProps, 'onMouseLeave', e, contentProps)
    }

    return contentHandlerProps
  }

  shouldBlurClose = e => {
    return (
      !e.currentTarget ||
      !this.tooltipDomElement ||
      (!e.currentTarget.contains(e.relatedTarget) &&
        !this.tooltipDomElement.contains(e.relatedTarget))
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

  renderTooltipContent(
    tooltipPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
  ): JSX.Element {
    const { align, position, offset, target } = this.props

    return (
      <Popper
        pointerTargetRef={this.pointerTargetRef}
        align={align}
        position={position}
        offset={offset}
        rtl={rtl}
        targetRef={target ? toRefObject(target) : this.triggerRef}
        children={this.renderPopperChildren.bind(this, tooltipPositionClasses, rtl, accessibility)}
      />
    )
  }

  renderPopperChildren = (
    tooltipPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
    { placement, scheduleUpdate }: PopperChildrenProps,
  ) => {
    const { content: propsContent, renderContent, pointing } = this.props
    const content = renderContent ? renderContent(scheduleUpdate) : propsContent

    const tooltipContentAttributes = {
      ...(rtl && { dir: 'rtl' }),
      ...accessibility.attributes.tooltip,
      ...accessibility.keyHandlers.tooltip,
      className: tooltipPositionClasses,
      ...this.getContentProps(),
    }

    const tooltipContent = Tooltip.Content.create(content, {
      defaultProps: {
        ...tooltipContentAttributes,
        placement,
        pointing,
        pointerRef: this.pointerTargetRef,
      },
      overrideProps: this.getContentProps,
    })

    return tooltipContent
  }

  trySetOpen(newValue: boolean, eventArgs: any) {
    this.trySetState({ open: newValue })
    _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } })
  }

  setTooltipOpen(newOpen, e) {
    clearTimeout(this.closeTimeoutId)
    newOpen ? this.trySetOpen(true, e) : this.scheduleTooltipClose(e)
  }

  scheduleTooltipClose = e => {
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
}
