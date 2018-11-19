import * as React from 'react'
import { ForwardRef } from 'react-is'

/**
 * A function that checks that a passed component is a `forwardRef()` component.
 *
 * We can't use there `isForwardRef()` from the `react-is` package because it asserts an element, not a component.
 * @see https://github.com/facebook/react/blob/v16.5.2/packages/react/src/forwardRef.js#L42
 * @see https://github.com/facebook/react/blob/v16.6.3/packages/shared/isValidElementType.js
 * @see https://codesandbox.io/s/kwkw3pq1k3
 * @param Component A component to check
 */
export const isForwardRefComponent = (Component: React.ReactType): boolean =>
  // Heads up!
  // Any is used there because type's definitions do not contain this internal property.
  typeof Component === 'object' && (Component as any).$$typeof === ForwardRef

/**
 * A function that checks that a passed component is a string component, i.e. "div", "a", etc.
 * @param Component A component to check
 */
export const isStringComponent = (Component: React.ReactType): boolean =>
  typeof Component === 'string'

/**
 * A function that checks that a passed component supports refs.
 * @param Component A component to check
 */
export const supportsRef = (Component: React.ReactType): boolean =>
  isStringComponent(Component) || isForwardRefComponent(Component)
