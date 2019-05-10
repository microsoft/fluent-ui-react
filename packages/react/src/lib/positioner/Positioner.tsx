import * as React from 'react'
import { Popper, PopperChildrenProps, PopperProps } from 'react-popper'
import { Ref } from '@stardust-ui/react-component-ref'
import { Modifiers } from 'popper.js'

import { Alignment, Position } from './index'
import { getPlacement, applyRtlToOffset } from './positioningHelper'
import createPopperReferenceProxy from './createPopperReferenceProxy'

export interface PositionCommonProps {
  /** Alignment for the component. */
  align?: Alignment

  /** Offset value to apply to rendered component. Accepts the following units:
   * - px or unit-less, interpreted as pixels
   * - %, percentage relative to the length of the trigger element
   * - %p, percentage relative to the length of the component element
   * - vw, CSS viewport width unit
   * - vh, CSS viewport height unit
   */
  offset?: string

  /**
   * Position for the component. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position
}

interface PositionerProps extends PopperProps, PositionCommonProps {
  /**
   * rtl attribute for the component
   */
  rtl?: boolean

  /**
   * Array of conditions to be met in order to trigger a subsequent render to reposition the elements.
   */
  positioningDependencies?: any[]

  /**
   * DOM element or ref representing the target used by the positioning mechanism.
   */
  target?: HTMLElement | React.RefObject<HTMLElement>
}

const Positioner: React.FunctionComponent<PositionerProps> = props => {
  const { align, children, offset, position, positioningDependencies, rtl, target, ...rest } = props
  // https://popper.js.org/popper-documentation.html#modifiers..offset
  const popperModifiers: Modifiers = offset && {
    offset: { offset: rtl ? applyRtlToOffset(offset, position) : offset },
    keepTogether: { enabled: false },
  }

  const scheduleUpdate = React.useRef<PopperChildrenProps['scheduleUpdate']>(null)

  React.useEffect(() => {
    if (scheduleUpdate.current) scheduleUpdate.current()
  }, positioningDependencies)

  return (
    <Popper
      positionFixed
      referenceElement={createPopperReferenceProxy(target)}
      placement={getPlacement({ align, position, rtl })}
      modifiers={popperModifiers}
      children={props => {
        scheduleUpdate.current = props.scheduleUpdate
        return <Ref innerRef={props.ref}>{children(props) as React.ReactElement}</Ref>
      }}
      {...rest}
    />
  )
}

export default Positioner
