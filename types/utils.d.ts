// ========================================================
// Utilities
// ========================================================

import * as React from 'react'

export type Extendable<T, V = any> = T & {
  [key: string]: V
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

export type ShorthandValue = React.ReactNode | Props
export type ShorthandRenderFunction = (
  Component: React.ReactType,
  props: Props,
  children: ReactChildren,
) => React.ReactElement<any>
