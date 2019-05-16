import * as React from 'react'
import PopperJS from 'popper.js'
import { Ref } from '@stardust-ui/react-component-ref'

import { getPlacement, applyRtlToOffset } from './positioningHelper'
import { Alignment, Position } from './index'

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

export interface PopperChildrenProps {
  placement: PopperJS.Placement
  scheduleUpdate: () => void
}

interface PopperProps extends PositionCommonProps {
  pointerRef?: React.RefObject<Element>
  children: (props: PopperChildrenProps) => React.ReactNode
  eventsEnabled?: boolean
  modifiers?: PopperJS.Modifiers
  positionFixed?: boolean
  targetRef?: React.RefObject<Element>

  /**
   * rtl attribute for the component
   */
  rtl?: boolean

  /**
   * Array of conditions to be met in order to trigger a subsequent render to reposition the elements.
   */
  positioningDependencies?: any[]
}

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    align,
    pointerRef,
    children,
    eventsEnabled,
    offset,
    position,
    positionFixed,
    modifiers,
    rtl,
    targetRef,
    positioningDependencies,
  } = props

  const popperRef = React.useRef<PopperJS>()
  const contentRef = React.useRef<Element>(null)

  const userPlacement = React.useMemo(() => getPlacement({ align, position, rtl }), [
    align,
    position,
    rtl,
  ])

  const [placement, setPlacement] = React.useState<PopperJS.Placement>(userPlacement)

  const handleUpdate = React.useCallback(
    (data: PopperJS.Data) => {
      if (data.placement !== placement) setPlacement(data.placement)
    },
    [placement],
  )

  React.useEffect(() => {
    const pointerRefElement = pointerRef && pointerRef.current
    const options: PopperJS.PopperOptions = {
      placement: userPlacement,
      eventsEnabled,
      positionFixed,
      modifiers: {
        ...(offset && {
          offset: { offset: rtl ? applyRtlToOffset(offset, position) : offset },
          keepTogether: { enabled: false },
        }),
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
  }, [eventsEnabled, handleUpdate, modifiers, offset, position, positionFixed, rtl, userPlacement].concat(positioningDependencies))

  return (
    <Ref innerRef={contentRef}>
      {
        children({
          placement,
          scheduleUpdate: popperRef.current && popperRef.current.scheduleUpdate,
        }) as React.ReactElement
      }
    </Ref>
  )
}

Popper.defaultProps = {
  eventsEnabled: true,
  positionFixed: false,
}

export default Popper
