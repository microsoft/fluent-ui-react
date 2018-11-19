// @ts-ignore TODO: resolve import issue
import * as hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'

import Ref from '../../components/Ref/Ref'
import { supportsRef } from './componentUtils'
import * as _ from 'lodash'

/**
 * Use just a string for now (react 16.6), since React doesn't support Symbols in props yet.
 * @see https://github.com/facebook/react/issues/7552
 */
export const forwardRefSymbol = '__forwardRef__'

/**
 * Creates a function that will choose how to pass a ref.
 * @param Component A component to wrap.
 */
export const forwardFunctionFactory = <C extends React.ComponentType<P>, P extends { as?: any }>(
  Component: C,
) => (props, ref: React.Ref<C>) => {
  // Heads up!
  // We have the basic idea that all our components will be wrapped with `forwardRefFactory()`
  // factory. This allows us to intercept a value `as` of prop because refs are passed to an
  // `ElementType`.

  // It's a complicated case, we have two ideas there:
  // - if we don't have a value for the `as` prop, this means that we will use a value from
  //   `defaultProps` or an `ElementType` will be `div` by default
  // - if we received a value that supports ref forwarding it means that we can pass down a ref
  //   and then it will be passed from unhandled props to a `ElementType`
  if (!props.as || supportsRef(props.as)) {
    return React.createElement(Component, Object.assign({}, props, { [forwardRefSymbol]: ref }))
  }

  // In this case we're dealing with a functional or a class component and we should use our `Ref`
  // component to determine a correct ref.
  return React.createElement(Ref, {
    children: React.createElement(Component, props as any),
    innerRef: ref,
  })
}

/**
 * Wraps a passed component with React.forwardRef() which produce a new component. Also assigns (hoists) static methods
 * of a passed component to a result component.
 * @param Component A component to wrap with forwardRef()
 */
export function forwardRefFactory<C extends React.ComponentType<P>, P extends { as?: any }>(
  Component: C,
): C {
  const componentFactory = forwardFunctionFactory(Component)
  const ForwardedComponent = React.forwardRef<C>(componentFactory)

  return hoistNonReactStatics(ForwardedComponent, Component) as C
}

/**
 * Wraps a passed component with React.forwardRef(), will warn a user about an unsupported `ref` prop.
 * @param Component A component to wrap with forwardRef()
 */
export const noForwardRefFactory = <C extends React.ComponentType<P>, P>(Component: C): C => {
  // Heads up!
  // We use memoization to avoid tons of warnings.
  const noRefSupport = _.memoize((show: boolean) => {
    if (show) {
      console.warn('Stardust UI: a "ref" prop is not supported by this component.')
    }

    return show
  })

  const ForwardedComponent = React.forwardRef<C>((props: P, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      noRefSupport(!!ref)
    }

    return React.createElement(Component, props)
  })

  return hoistNonReactStatics(ForwardedComponent, Component) as C
}
