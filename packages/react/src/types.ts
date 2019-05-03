// ========================================================
// Utilities
// ========================================================

import * as React from 'react'

export type Extendable<T, V = any> = T & {
  [key: string]: V
}

export type Nullable<T> = T | null
export type NullableIfUndefined<T> = T extends undefined ? Nullable<T> : T

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

type ValueOf<TFirst, TSecond, TKey extends keyof (TFirst & TSecond)> = TKey extends keyof TFirst
  ? TFirst[TKey]
  : TKey extends keyof TSecond
  ? TSecond[TKey]
  : {}

type Extended<TFirst, TSecond> = { [K in keyof (TFirst & TSecond)]: ValueOf<TFirst, TSecond, K> }

type ExcludeProps<TFrom, TPropNames> = { [Key in Exclude<keyof TFrom, TPropNames>]?: TFrom[Key] }

export type ReactProps<T> = ExcludeProps<{ [K in keyof T]: NullableIfUndefined<T[K]> }, 'as'>

export type ReactPropsNoAs<T> = ReactProps<T>

export type StardustProps<T, TAs = 'div'> = TAs extends null
  ? ReactProps<T> & { as?: TAs }
  : TAs extends false
  ? ReactProps<T> & { as?: never }
  : Extended<ReactProps<T>, PropsOf<TAs>> & (TAs extends 'div' ? { as?: 'div' } : { as: TAs })

export type ComponentEventHandler<TProps> = (
  event: React.SyntheticEvent<HTMLElement>,
  data: TProps,
) => void

type ChildrenProps = { children: any }
export type PropsOf<T> = T extends React.Component<infer TProps>
  ? (ChildrenProps & TProps)
  : T extends React.FunctionComponent<infer TProps>
  ? (ChildrenProps & TProps)
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
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
