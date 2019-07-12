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
  getOrGenerateIdFromShorthand,
} from '../../lib'
import { ShorthandValue, Props } from '../../types'
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  BasicPositioningProps,
  PopperChildrenProps,
} from '../../lib/positioner'
import TooltipContent from './TooltipContent'
import { tooltipBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'

export interface TooltipSlotClassNames {
  content: string
}

export interface TooltipState {
  open: boolean
  contentId: string
}

export interface TooltipProps
  extends StyledComponentProps<TooltipProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue>,
    BasicPositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Existing element the tooltip should be bound to. */
  mountNode?: HTMLElement

  /** Delay in ms for the mouse leave event, before the tooltip will be closed. */
  mouseLeaveDelay?: number

  /** Defines whether tooltip is displayed. */
  open?: boolean

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /**
   * DOM element that should be used as tooltip's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Element to be rendered in-place where the tooltip is defined. */
  trigger?: JSX.Element
}

/**
 * A Tooltip is non-modal element that floats around its target and displays its label.
 * Tooltip doesn't receive focus and cannot contain focusable elements.
 *
 * @accessibility
 * Implements [ARIA Tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern.
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
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    target: customPropTypes.domNode,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.element]),
    content: customPropTypes.shorthandAllowingChildren,
  }

  static defaultProps: TooltipProps = {
    align: 'center',
    mountNode: isBrowser() ? document.body : null,
    position: 'above',
    mouseLeaveDelay: 500,
    pointing: true,
    accessibility: tooltipBehavior,
  }

  static autoControlledProps = ['open']

  pointerTargetRef = React.createRef<HTMLElement>()
  triggerRef = React.createRef<HTMLElement>()
  contentRef = React.createRef<HTMLElement>()
  closeTimeoutId

  actionHandlers = {
    close: e => {
      this.setTooltipOpen(false, e)
      e.stopPropagation()
      e.preventDefault()
    },
  }

  static getAutoControlledStateFromProps(
    props: TooltipProps,
    state: TooltipState,
  ): Partial<TooltipState> {
    return {
      contentId: getOrGenerateIdFromShorthand('tooltip-content-', props.content, state.contentId),
    }
  }

  renderComponent({
    classes,
    rtl,
    accessibility,
  }: RenderResultConfig<TooltipProps>): React.ReactNode {
    const { mountNode, children, trigger } = this.props
    const tooltipContent = this.renderTooltipContent(classes.content, rtl, accessibility)

    const triggerElement = React.Children.only(
      childrenExist(children) ? children : trigger,
    ) as React.ReactElement<any>
    const triggerProps = this.getTriggerProps(triggerElement)

    return (
      <>
        {triggerElement && (
          <Ref innerRef={this.triggerRef}>
            {React.cloneElement(triggerElement, {
              ...accessibility.attributes.trigger,
              ...triggerProps,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.trigger, triggerProps),
            })}
          </Ref>
        )}
        {mountNode && ReactDOM.createPortal(tooltipContent, mountNode)}
      </>
    )
  }

  getTriggerProps(triggerElement) {
    const triggerProps: Props = {}

    triggerProps.onFocus = (e, ...args) => {
      if (isFromKeyboard()) {
        this.trySetOpen(true, e)
      }
      _.invoke(triggerElement, 'props.onFocus', e, ...args)
    }
    triggerProps.onBlur = (e, ...args) => {
      if (!this.shouldStayOpen(e)) {
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
    const contentHandlerProps: Props = {}

    contentHandlerProps.onMouseEnter = (e, contentProps) => {
      this.setTooltipOpen(true, e)
      _.invoke(predefinedProps, 'onMouseEnter', e, contentProps)
    }
    contentHandlerProps.onMouseLeave = (e, contentProps) => {
      this.setTooltipOpen(false, e)
      _.invoke(predefinedProps, 'onMouseLeave', e, contentProps)
    }

    return contentHandlerProps
  }

  shouldStayOpen = e =>
    _.invoke(e, 'currentTarget.contains', e.relatedTarget) ||
    _.invoke(this.contentRef.current, 'contains', e.relatedTarget)

  renderTooltipContent(
    tooltipPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
  ): JSX.Element {
    const { align, position, target } = this.props

    return (
      <Popper
        pointerTargetRef={this.pointerTargetRef}
        align={align}
        position={position}
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
    { placement }: PopperChildrenProps,
  ) => {
    const { content, pointing } = this.props

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

    return <Ref innerRef={this.contentRef}>{tooltipContent}</Ref>
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
