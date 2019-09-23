import * as React from 'react'
import * as _ from 'lodash'
import PopperJS, * as _PopperJS from 'popper.js'
import { Ref, isRefObject } from '@stardust-ui/react-component-ref'

import { getPlacement, applyRtlToOffset } from './positioningHelper'
import { PopperProps, PopperChildrenFn } from './types'
import getScrollParent from './getScrollParent'

// `popper.js` has a UMD build without `.default`, it breaks CJS builds:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const createPopper = (
  reference: Element | _PopperJS.ReferenceObject,
  popper: Element,
  options?: PopperJS.PopperOptions,
): PopperJS => new ((_PopperJS as any).default || _PopperJS)(reference, popper, options)

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    align,
    children,
    enabled,
    modifiers: userModifiers,
    offset,
    pointerTargetRef,
    position,
    positionFixed,
    positioningDependencies = [],
    rtl,
    targetRef,
    unstable_pinned,
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

  const scheduleUpdate = React.useCallback(() => {
    if (popperRef.current) {
      popperRef.current.scheduleUpdate()
    }
  }, [])

  const destroyInstance = React.useCallback(() => {
    if (popperRef.current) {
      popperRef.current.destroy()
      popperRef.current = null
    }
  }, [])

  const createInstance = React.useCallback(() => {
    destroyInstance()

    const reference =
      targetRef && isRefObject(targetRef)
        ? (targetRef as React.RefObject<Element>).current
        : (targetRef as _PopperJS.ReferenceObject)

    if (!enabled || !reference || !contentRef.current) {
      return
    }

    const pointerTargetRefElement = pointerTargetRef && pointerTargetRef.current
    const scrollParentElement = getScrollParent(contentRef.current)
    const popperHasScrollableParent = scrollParentElement !== scrollParentElement.ownerDocument.body

    const modifiers: PopperJS.Modifiers = _.merge(
      { preventOverflow: { padding: 0 } },
      { flip: { padding: 0, flipVariationsByContent: true } },
      /**
       * When the popper box is placed in the context of a scrollable element, we need to set
       * preventOverflow.escapeWithReference to true and flip.boundariesElement to 'scrollParent' (default is 'viewport')
       * so that the popper box will stick with the targetRef when we scroll targetRef out of the viewport.
       */
      popperHasScrollableParent && {
        preventOverflow: { escapeWithReference: true },
        flip: { boundariesElement: 'scrollParent' },
      },
      /**
       * unstable_pinned disables the flip modifier by setting flip.enabled to false; this disables automatic
       * repositioning of the popper box; it will always be placed according to the values of `align` and
       * `position` props, regardless of the size of the component, the reference element or the viewport.
       */
      unstable_pinned && { flip: { enabled: false } },
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
      positionFixed,
      modifiers,
      onCreate: handleUpdate,
      onUpdate: handleUpdate,
    }

    popperRef.current = createPopper(reference, contentRef.current, options)
  }, [
    // TODO review dependencies for popperHasScrollableParent
    computedModifiers,
    enabled,
    userModifiers,
    positionFixed,
    proposedPlacement,
    unstable_pinned,
    targetRef,
  ])

  React.useLayoutEffect(() => {
    createInstance()
    return destroyInstance
  }, [createInstance])

  React.useEffect(scheduleUpdate, [...positioningDependencies, computedPlacement])

  const child =
    typeof children === 'function'
      ? (children as PopperChildrenFn)({
          placement: computedPlacement,
          scheduleUpdate,
        })
      : children

  return <Ref innerRef={contentRef}>{React.Children.only(child) as React.ReactElement}</Ref>
}

Popper.defaultProps = {
  enabled: true,
  positionFixed: false,
  positioningDependencies: [],
}

export default Popper
