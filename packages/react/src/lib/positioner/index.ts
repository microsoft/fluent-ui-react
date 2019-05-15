export type Position = 'above' | 'below' | 'before' | 'after'
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center'
export const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
export const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export { default as Popper, PositionCommonProps, PopperChildrenProps } from './Popper'
