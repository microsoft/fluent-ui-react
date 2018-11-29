// ========================================================
// Utilities
// ========================================================

import * as React from 'react'

export type Extendable<T> = T & {
  [key: string]: any
}

export type Partial<T> = { [Key in keyof T]?: T[Key] }

export type ArgOf<T> = T extends (arg: infer TArg) => any ? TArg : never
export type ResultOf<T> = T extends (...arg: any[]) => infer TResult ? TResult : never

export type OneOrArray<T> = T | T[]
export type ObjectOf<T> = { [key: string]: T }

export type ObjectOrFunc<TResult, TArg = {}> = ((arg: TArg) => TResult) | TResult

// ========================================================
// Props
// ========================================================

export type Props = ObjectOf<any>
export type ReactChildren = React.ReactNodeArray | React.ReactNode
export type ComponentEventHandler<TProps> = (event: React.SyntheticEvent, data: TProps) => void

// ========================================================
// Shorthand Factories
// ========================================================

export type ShorthandRenderTreeFunc = (
  Component: React.ReactType,
  props: Props,
) => React.ReactElement<any>

export type ShorthandRenderer = (
  value: ShorthandValue,
  renderTree?: ShorthandRenderTreeFunc,
) => React.ReactElement<any>

export type ShorthandRenderCallback = (render: ShorthandRenderer) => React.ReactElement<any>

export type ShorthandValue = React.ReactNode | Props

// OBSOLETE
export type ShorthandRenderFunction = (
  Component: React.ReactType,
  props: Props,
  children: ReactChildren,
) => React.ReactElement<any>
