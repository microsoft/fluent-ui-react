import { IProps } from './theme'

// ========================================================
// Utilities
// ========================================================

export type Extendable<T> = T & {
  [key: string]: any
}

// ========================================================
// Props
// ========================================================

export type ItemShorthandFunction<TProps = {}> = (
  Component: React.ComponentType,
  props: Extendable<TProps>,
) => React.ReactNode

export type ItemShorthand<TProps = {}> =
  | string
  | number
  | boolean
  | IProps
  | null
  | undefined
  | ItemShorthandFunction<TProps>

export type ReactChildren = React.ReactNodeArray | React.ReactNode
export type ComponentEventHandler<TProps> = (event: React.SyntheticEvent, data: TProps) => void
