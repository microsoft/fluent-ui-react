import PopperJS from 'popper.js'

export type Position = 'above' | 'below' | 'before' | 'after'
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center'
export const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
export const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export type PopperChildrenFn = (props: PopperChildrenProps) => React.ReactNode

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

export interface PopperProps extends PositionCommonProps {
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
