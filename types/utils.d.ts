// ========================================================
// Utilities
// ========================================================

import * as React from 'react'

export type Extendable<T, V = any> = T & {
  [key: string]: V
}

export type Nullable<T> = T | null
export type NullableIfUndefined<T> = T extends undefined ? Nullable<T> : T

export type Partial<T> = { [Key in keyof T]?: T[Key] }

export type ArgOf<T> = T extends (arg: infer TArg) => any ? TArg : never
export type ResultOf<T> = T extends (...arg: any[]) => infer TResult ? TResult : never

export type OneOrArray<T> = T | T[]
export type ObjectOf<T> = { [key: string]: T }

export type ObjectOrFunc<TResult, TArg = {}> = ((arg: TArg) => TResult) | TResult

// ========================================================
// Props
// ========================================================

export type Props<T = {}> = T & ObjectOf<any>
export type ReactChildren = React.ReactNodeArray | React.ReactNode

export type ReactPropsStrict<T> = { [K in keyof T]: NullableIfUndefined<T[K]> }
export type ReactProps<T> = Extendable<ReactPropsStrict<T>>

export type ComponentEventHandler<TProps> = (
  event: React.SyntheticEvent<HTMLElement>,
  data: TProps,
) => void

type ChildrenProps = { children: any }
export type PropsOf<T> = T extends React.ComponentClass<Extendable<infer TProps>>
  ? (ChildrenProps & TProps)
  : T extends React.ComponentClass<infer TProps>
  ? (ChildrenProps & TProps)
  : T extends React.StatelessComponent<Extendable<infer TProps>>
  ? (ChildrenProps & TProps)
  : T extends React.StatelessComponent<infer TProps>
  ? (ChildrenProps & TProps)
  : any

// ========================================================
// Shorthand Factories
// ========================================================

export type ShorthandRenderFunction = (
  Component: React.ReactType,
  props: Props,
) => React.ReactElement<any>

export type ShorthandRenderer = (
  value: ShorthandValue,
  renderTree?: ShorthandRenderFunction,
) => React.ReactElement<any>

export type ShorthandRenderCallback = (render: ShorthandRenderer) => React.ReactElement<any>

// The ReactFragment here is replaced from the original typings with ReactNodeArray because of incorrect inheriting of the type when it is defined as {}
type ReactNode =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | boolean
  | null
  | undefined

export type ShorthandValue<P = {}> = ReactNode | Props<P>
export type ShorthandCollection<K = []> = ShorthandValue<{ kind?: K }>[]
