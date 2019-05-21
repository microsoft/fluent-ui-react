import * as React from 'react'
import PopperJS from 'popper.js'
import { Ref } from '@stardust-ui/react-component-ref'

import { getPlacement, applyRtlToOffset } from './positioningHelper'
import { Alignment, Position } from './types'

export interface PositionCommonProps {
  /**
   * Alignment for the component.
   */
  align?: Alignment

  /**
   * Offset value to apply to rendered component. Accepts the following units:
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

export interface PopperChildrenProps {
  /**
   * Popper's placement.
   */
  placement: PopperJS.Placement

  /**
   * Function that updates the position of the Popper box, computing the new offsets and applying the new style.
   */
  scheduleUpdate(): void
}

type PopperChildrenFn = (props: PopperChildrenProps) => React.ReactNode

interface PopperProps extends PositionCommonProps {
  /**
   * Ref object containing the pointer node.
   */
  pointerRef?: React.RefObject<Element>

  /**
   * The content of the Popper box (the element that is going to be repositioned).
   */
  children: PopperChildrenFn | React.ReactNode

  /**
   * Enables events (resize, scroll).
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled?: boolean

  /**
   * List of modifiers used to modify the offsets before they are applied to the Popper box.
   * They provide most of the functionality of Popper.js.
   */
  modifiers?: PopperJS.Modifiers

  /**
   * Array of conditions to be met in order to trigger a subsequent render to reposition the elements.
   */
  positioningDependencies?: React.DependencyList

  /**
   * Enables the Popper box to position itself in 'fixed' mode (default value is position: 'absolute')
   * @prop {Boolean} positionFixed=false
   */
  positionFixed?: boolean

  /**
   * Ref object containing the target node (the element that we're using as reference for Popper box).
   */
  targetRef?: React.RefObject<Element>

  /**
   * Rtl attribute for the component.
   */
  rtl?: boolean
}

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    align,
    children,
    eventsEnabled,
    modifiers,
    offset,
    pointerRef,
    position,
    positionFixed,
    positioningDependencies = [],
    rtl,
    targetRef,
  } = props

  const proposedPlacement = getPlacement({ align, position, rtl })

  const popperRef = React.useRef<PopperJS>()
  const contentRef = React.useRef<HTMLElement>(null)
  const latestPlacement = React.useRef<PopperJS.Placement>(proposedPlacement)
  const [computedPlacement, setComputedPlacement] = React.useState<PopperJS.Placement>(
    proposedPlacement,
  )

  const computedModifiers: PopperJS.Modifiers = React.useMemo(
    () =>
      offset && {
        offset: { offset: rtl ? applyRtlToOffset(offset, position) : offset },
        keepTogether: { enabled: false },
      },
    [rtl, offset, position],
  )

  React.useEffect(
    () => {
      const handleUpdate = (data: PopperJS.Data) => {
        // PopperJS performs computations that might update the computed placement: auto positioning, flipping the
        // placement in case the popper box should be rendered at the edge of the viewport and does not fit
        if (data.placement !== latestPlacement.current) {
          latestPlacement.current = data.placement
          setComputedPlacement(data.placement)
        }
      }

      const pointerRefElement = pointerRef && pointerRef.current
      const options: PopperJS.PopperOptions = {
        placement: proposedPlacement,
        eventsEnabled,
        positionFixed,
        modifiers: {
          ...computedModifiers,
          ...modifiers,
          arrow: {
            enabled: !!pointerRefElement,
            element: pointerRefElement,
          },
        },
        onCreate: handleUpdate,
        onUpdate: handleUpdate,
      }

      popperRef.current = new PopperJS(targetRef.current, contentRef.current, options)
      return () => popperRef.current.destroy()
    },
    [computedModifiers, eventsEnabled, modifiers, positionFixed, proposedPlacement],
  )

  React.useEffect(
    () => {
      popperRef.current.scheduleUpdate()
    },
    [...positioningDependencies, computedPlacement],
  )

  const child =
    typeof children === 'function'
      ? (children as PopperChildrenFn)({
          placement: computedPlacement,
          scheduleUpdate: () => popperRef.current && popperRef.current.scheduleUpdate(),
        })
      : React.Children.only(children)

  return <Ref innerRef={contentRef}>{child as React.ReactElement}</Ref>
}

Popper.defaultProps = {
  eventsEnabled: true,
  positionFixed: false,
  positioningDependencies: [],
}

export default Popper
