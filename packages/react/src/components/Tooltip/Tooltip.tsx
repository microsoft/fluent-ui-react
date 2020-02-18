import {
  Accessibility,
  tooltipAsLabelBehavior,
  TooltipBehaviorProps,
} from '@fluentui/accessibility'
import { useAccessibility, useAutoControlled, useTelemetry } from '@fluentui/react-bindings'
import { Ref } from '@fluentui/react-component-ref'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  StyledComponentProps,
  commonPropTypes,
  isFromKeyboard,
  setWhatInputSource,
  getOrGenerateIdFromShorthand,
  createShorthandFactory,
} from '../../utils'
import { ShorthandValue, FluentComponentStaticProps, ProviderContextPrepared } from '../../types'
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  BasicPositioningProps,
  PopperChildrenProps,
  Alignment,
  Position,
} from '../../utils/positioner'
import PortalInner from '../Portal/PortalInner'
import TooltipContent, { TooltipContentProps } from './TooltipContent'

export interface TooltipSlotClassNames {
  content: string
}

export interface TooltipProps
  extends StyledComponentProps<TooltipProps>,
    ChildrenComponentProps<React.ReactElement>,
    ContentComponentProps<ShorthandValue<TooltipContentProps>>,
    BasicPositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tooltipBehavior
   * @available tooltipAsLabelBehavior
   * */
  accessibility?: Accessibility<TooltipBehaviorProps>

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

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: (
    e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
    data: TooltipProps,
  ) => void

  /**
   * Offset value to apply to rendered component. Accepts the following units:
   * - px or unit-less, interpreted as pixels
   * - %, percentage relative to the length of the trigger element
   * - %p, percentage relative to the length of the component element
   * - vw, CSS viewport width unit
   * - vh, CSS viewport height unit
   */
  offset?: string

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
 * A Tooltip displays additional non-modal information on top of its target element.
 * Tooltip doesn't receive focus and cannot contain focusable elements.
 *
 * @accessibility
 * Implements [ARIA Tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern.
 */
const Tooltip: React.FC<TooltipProps> &
  FluentComponentStaticProps<TooltipProps> & {
    Content: typeof TooltipContent
    slotClassNames: TooltipSlotClassNames
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(Tooltip.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    align,
    children,
    content,
    mountNode,
    mouseLeaveDelay,
    offset,
    pointing,
    position,
    target,
    trigger,
  } = props

  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,

    initialValue: false,
  })

  const contentRef = React.useRef<HTMLElement>()
  const pointerTargetRef = React.useRef<HTMLDivElement>()
  const triggerRef = React.useRef<HTMLElement>()

  const closeTimeoutId = React.useRef<number>()
  // TODO: Consider `getOrGenerateIdFromShorthand()` as hook and make it SSR safe
  const contentId = React.useRef<string>()
  contentId.current = getOrGenerateIdFromShorthand('tooltip-content-', content, contentId.current)

  const getA11Props = useAccessibility(accessibility, {
    actionHandlers: {
      close: e => {
        setTooltipOpen(false, e)
        e.stopPropagation()
        e.preventDefault()
      },
    },
    mapPropsToBehavior: () => ({
      'aria-describedby': props['aria-describedby'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      contentId: contentId.current,
      open,
    }),
  })

  const getContentOverrideProps = (
    predefinedProps: TooltipContentProps,
  ): TooltipContentProps &
    Pick<React.DOMAttributes<HTMLDivElement>, 'onMouseEnter' | 'onMouseLeave'> => ({
    onMouseEnter: (e: React.MouseEvent) => {
      setTooltipOpen(true, e)
      _.invoke(predefinedProps, 'onMouseEnter', e)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setTooltipOpen(false, e)
      _.invoke(predefinedProps, 'onMouseLeave', e)
    },
  })

  const renderPopperChildren = (popperProps: PopperChildrenProps) => {
    const tooltipContent = TooltipContent.create(content, {
      defaultProps: () =>
        getA11Props('tooltip', {
          open,
          placement: popperProps.placement,
          pointing,
          pointerRef: pointerTargetRef,
        }),
      generateKey: false,
      overrideProps: getContentOverrideProps,
    })

    return tooltipContent ? <Ref innerRef={contentRef}>{tooltipContent}</Ref> : null
  }

  const shouldStayOpen = (e: React.FocusEvent) =>
    _.invoke(e, 'currentTarget.contains', e.relatedTarget) ||
    _.invoke(contentRef.current, 'contains', e.relatedTarget)

  const trySetOpen = (
    newValue: boolean,
    e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent,
  ) => {
    setOpen(newValue)
    _.invoke(props, 'onOpenChange', e, { ...props, ...{ open: newValue } })
  }

  const setTooltipOpen = (newOpen: boolean, e: React.MouseEvent | React.KeyboardEvent) => {
    clearTimeout(closeTimeoutId.current)

    if (newOpen) {
      trySetOpen(true, e)
    } else {
      closeTimeoutId.current = context.target.defaultView.setTimeout(() => {
        trySetOpen(false, e)
      }, mouseLeaveDelay)
    }
  }

  const triggerNode: React.ReactElement | undefined = childrenExist(children) ? children : trigger
  const triggerElement = triggerNode && React.Children.only(triggerNode)

  const triggerProps: React.HTMLAttributes<HTMLElement> = {
    onFocus: (e, ...args) => {
      if (isFromKeyboard()) {
        trySetOpen(true, e)
      }
      _.invoke(triggerElement, 'props.onFocus', e, ...args)
    },
    onBlur: (e, ...args) => {
      if (!shouldStayOpen(e)) {
        trySetOpen(false, e)
      }
      _.invoke(triggerElement, 'props.onBlur', e, ...args)
    },
    onMouseEnter: (e, ...args) => {
      setTooltipOpen(true, e)
      setWhatInputSource(context.target, 'mouse')
      _.invoke(triggerElement, 'props.onMouseEnter', e, ...args)
    },
    onMouseLeave: (e, ...args) => {
      setTooltipOpen(false, e)
      _.invoke(triggerElement, 'props.onMouseLeave', e, ...args)
    },
  }

  const element = (
    <>
      {triggerElement && (
        <Ref innerRef={triggerRef}>
          {React.cloneElement(triggerElement, getA11Props('trigger', triggerProps))}
        </Ref>
      )}
      <PortalInner mountNode={mountNode}>
        <Popper
          pointerTargetRef={pointerTargetRef}
          align={align}
          offset={offset}
          position={position}
          enabled={open}
          rtl={context.rtl}
          targetRef={target || triggerRef}
          children={renderPopperChildren}
        />
      </PortalInner>
    </>
  )
  setEnd()

  return element
}

Tooltip.className = 'ui-tooltip'
Tooltip.displayName = 'Tooltip'

Tooltip.slotClassNames = {
  content: `${Tooltip.className}__content`,
}

Tooltip.defaultProps = {
  align: 'center',
  position: 'above',
  mouseLeaveDelay: 10,
  pointing: true,
  accessibility: tooltipAsLabelBehavior,
}
Tooltip.propTypes = {
  ...commonPropTypes.createCommon({
    as: false,
    content: false,
  }),
  align: PropTypes.oneOf<Alignment>(ALIGNMENTS),
  children: PropTypes.element,
  defaultOpen: PropTypes.bool,
  mountNode: customPropTypes.domNode,
  mouseLeaveDelay: PropTypes.number,
  offset: PropTypes.string,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  pointing: PropTypes.bool,
  position: PropTypes.oneOf<Position>(POSITIONS),
  target: customPropTypes.domNode,
  trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.element]),
  content: customPropTypes.shorthandAllowingChildren,
}
Tooltip.handledProps = Object.keys(Tooltip.propTypes) as any

Tooltip.Content = TooltipContent

Tooltip.create = createShorthandFactory({ Component: Tooltip, mappedProp: 'content' })

export default Tooltip
