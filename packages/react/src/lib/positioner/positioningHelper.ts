import { Placement } from 'popper.js'

import { Alignment, Position } from './types'

enum PlacementParts {
  top = 'top',
  bottom = 'bottom',
  start = 'start',
  end = 'end',
  left = 'left',
  right = 'right',
  center = '',
}

const getPositionMap = (rtl: boolean): { [key in Position]: PlacementParts } => ({
  above: PlacementParts.top,
  below: PlacementParts.bottom,
  before: rtl ? PlacementParts.right : PlacementParts.left,
  after: rtl ? PlacementParts.left : PlacementParts.right,
})

const getAlignmentMap = (rtl: boolean): { [key in Alignment]: PlacementParts } => ({
  start: rtl ? PlacementParts.end : PlacementParts.start,
  end: rtl ? PlacementParts.start : PlacementParts.end,
  top: PlacementParts.start,
  bottom: PlacementParts.end,
  center: PlacementParts.center,
})

const shouldAlignToCenter = (p: Position, a: Alignment) => {
  const positionedVertically = p === 'above' || p === 'below'
  const alignedVertically = a === 'top' || a === 'bottom'

  return (
    (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically)
  )
}

/**
 * | position | alignment | placement       | placement RTL
 * -----------------------------------------------------------------
 * | above    | start     |  top-start      |  top-end
 * | above    | center    |  top            |  top
 * | above    | end       |  top-end        |  top-start
 * | below    | start     |  bottom-start   |  bottom-end
 * | below    | center    |  bottom         |  bottom
 * | below    | end       |  bottom-end     |  bottom-start
 * | before   | top       |  left-start     |  right-start
 * | before   | center    |  left           |  right
 * | before   | bottom    |  left-end       |  right-end
 * | after    | top       |  right-start    |  left-start
 * | after    | center    |  right          |  left
 * | after    | bottom    |  right-end      |  left-end
 */
export const getPlacement = ({
  align,
  position,
  rtl,
}: {
  align: Alignment
  position: Position
  rtl: boolean
}): Placement => {
  const alignment: Alignment = shouldAlignToCenter(position, align) ? 'center' : align
  const computedPosition = getPositionMap(rtl)[position]
  const computedAlignmnent = getAlignmentMap(rtl)[alignment]
  const stringifiedAlignment = computedAlignmnent && `-${computedAlignmnent}`

  return `${computedPosition}${stringifiedAlignment}` as Placement
}

//
// OFFSET VALUES ADJUSTMENT
//

const flipPlusMinusSigns = (offset: string): string => {
  return offset
    .replace(/\-/g, '<plus>')
    .replace(/^(\s*)(?=\d)/, '<minus>')
    .replace(/\+/g, '<minus>')
    .replace(/<plus>/g, '+')
    .replace(/<minus>/g, '-')
    .trimLeft()
    .replace(/^\+/, '')
}

export const applyRtlToOffset = (offset: string, position: Position): string => {
  if (position === 'above' || position === 'below') {
    const [horizontal, vertical] = offset.split(',')
    return [flipPlusMinusSigns(horizontal), vertical]
      .join(', ')
      .replace(/, $/, '')
      .trim()
  }

  return offset
}
