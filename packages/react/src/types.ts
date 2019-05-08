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

export type ReactProps<T> = Extended<
  { [K in keyof T]: NullableIfUndefined<T[K]> } & { as?: any },
  React.HTMLAttributes<any>
>

export type ComponentEventHandler<TProps> = (
  event: React.SyntheticEvent<HTMLElement>,
  data?: TProps,
) => void

export type ComponentKeyboardEventHandler<TProps> = (
  event: React.KeyboardEvent<any>,
  data?: TProps,
) => void

export type PropsOf<T> = T extends React.Component<infer TProps>
  ? TProps
  : T extends React.FunctionComponent<infer TProps>
  ? TProps
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : never

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

// ========================================================
// Types for As prop support
// ========================================================

type ValueOf<TFirst, TSecond, TKey extends keyof (TFirst & TSecond)> = TKey extends keyof TFirst
  ? TFirst[TKey]
  : TKey extends keyof TSecond
  ? TSecond[TKey]
  : {}

type Extended<TFirst, TSecond> = { [K in keyof (TFirst & TSecond)]: ValueOf<TFirst, TSecond, K> }

type AsHtmlElement<Tag extends keyof JSX.IntrinsicElements, TProps> = {
  as: Tag
} & JSX.IntrinsicElements[Tag] &
  TProps

type AsComponent<C, TProps> = { as: C } & TProps & PropsOf<InstanceOf<C>>

type CommonStaticProps =
  | 'Group'
  | 'Item'
  | 'Description'
  | 'className'
  | 'create'
  | 'slotClassNames'
  | 'displayName'

type Intersect<First extends string | number | symbol, Second extends string | number | symbol> = {
  [K in First]: K extends Second ? K : never
}[First]

type PickProps<T, Props extends string | number | symbol> = {
  [K in Intersect<Props, keyof T>]: T[K]
}

export type InstanceOf<T> = T extends { new (...args: any[]): infer TInstance } ? TInstance : never

export const safeTyped = function<
  TComponentType extends React.ComponentType,
  TProps,
  TAs extends keyof JSX.IntrinsicElements = 'div'
>(componentType: TComponentType) {
  function overloadedComponentType<Tag extends keyof JSX.IntrinsicElements>(
    x: AsHtmlElement<Tag, TProps>,
  ): JSX.Element
  function overloadedComponentType<Tag>(x: AsComponent<Tag, TProps>): JSX.Element
  function overloadedComponentType(x: Extended<TProps, JSX.IntrinsicElements[TAs]>): JSX.Element
  function overloadedComponentType(): never {
    throw new Error('Defines unreachable execution scenario')
  }

  return (componentType as any) as typeof overloadedComponentType &
    PickProps<TComponentType, CommonStaticProps>
}

export type UNSAFE_typed<TComponentType, TProps> = React.FunctionComponent<
  TProps & { [K: string]: any }
> &
  PickProps<TComponentType, keyof TComponentType>

export const UNSAFE_typed = <TComponentType>(componentType: TComponentType) => {
  return {
    withProps: <TProps>() => (componentType as any) as UNSAFE_typed<TComponentType, TProps>,
  }
}
