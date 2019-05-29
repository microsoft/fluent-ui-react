import * as React from 'react'
import * as _ from 'lodash'
import PopperJS from 'popper.js'
import { Ref } from '@stardust-ui/react-component-ref'

import { getPlacement, applyRtlToOffset } from './positioningHelper'
import { PopperProps, PopperChildrenFn } from './types'
import getScrollParent from './getScrollParent'

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    align,
    children,
    eventsEnabled,
    modifiers: userModifiers,
    offset,
    pointerTargetRef,
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
      const pointerTargetRefElement = pointerTargetRef && pointerTargetRef.current
      const popperHasScrollableParent = getScrollParent(contentRef.current) !== document.body

      const modifiers: PopperJS.Modifiers = _.merge(
        { preventOverflow: { padding: 0 } },
        /**
         * When the popper box is placed in the context of a scrollable element, we need to set
         * preventOverflow.escapeWithReference to true and flip.boundariesElement to 'scrollParent' (default is 'viewport')
         * so that the popper box will stick with the targetRef when we scroll targetRef out of the viewport.
         */
        popperHasScrollableParent && {
          preventOverflow: { escapeWithReference: true },
          flip: { boundariesElement: 'scrollParent' },
        },
        computedModifiers,
        userModifiers,
        /**
         * This modifier is necessary in order to render the pointer.
         */
        {
          arrow: {
            enabled: !!pointerTargetRefElement,
            element: pointerTargetRefElement,
          },
        },
      )

      const handleUpdate = (data: PopperJS.Data) => {
        // PopperJS performs computations that might update the computed placement: auto positioning, flipping the
        // placement in case the popper box should be rendered at the edge of the viewport and does not fit
        if (data.placement !== latestPlacement.current) {
          latestPlacement.current = data.placement
          setComputedPlacement(data.placement)
        }
      }

      const options: PopperJS.PopperOptions = {
        placement: proposedPlacement,
        eventsEnabled,
        positionFixed,
        modifiers,
        onCreate: handleUpdate,
        onUpdate: handleUpdate,
      }

      popperRef.current = new PopperJS(targetRef.current, contentRef.current, options)
      return () => popperRef.current.destroy()
    },
    [computedModifiers, eventsEnabled, userModifiers, positionFixed, proposedPlacement],
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
