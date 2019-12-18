import cx from 'classnames'
import * as _ from 'lodash'
import * as React from 'react'
import {
  ShorthandValue,
  Props,
  ShorthandRenderCallback,
  ShorthandRenderFunction,
  ShorthandRenderer,
} from '../types'
import { mergeStyles } from './mergeThemes'

interface CreateShorthandOptions<P> {
  /** Default props object */
  defaultProps?: () => Partial<Props<P>>

  /** Override props object or function (called with regular props) */
  overrideProps?: Partial<Props<P>> | ((props: P) => Partial<Props<P>>)

  /** Whether or not automatic key generation is allowed */
  generateKey?: boolean

  /** Override the default render implementation. */
  render?: ShorthandRenderFunction<P>
}

// ============================================================
// Factories
// ============================================================

/** A more robust React.createElement. It can create elements from primitive values. */
export function createShorthand<P>({
  allowsJSX,
  Component,
  valueOrRenderCallback,
  options = {},
}: {
  Component: React.ElementType
  allowsJSX?: boolean
  valueOrRenderCallback?: ShorthandValue<P> | ShorthandRenderCallback<P>
  options?: CreateShorthandOptions<P>
}): React.ReactElement<Props> | null | undefined {
  const valIsRenderFunction =
    typeof valueOrRenderCallback === 'function' && !React.isValidElement(valueOrRenderCallback)
  if (valIsRenderFunction) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          '@microsoft/fluent-ui-react:',
          'The usage of render callback is deprecated and will be removed soon. Please use render props for shorthands instead.',
          'See: https://microsoft.github.io/fluent-ui-react/shorthand-props',
        ].join(' '),
      )
    }

    return createShorthandFromRenderCallback({
      allowsJSX,
      Component,
      renderCallback: valueOrRenderCallback as ShorthandRenderCallback<P>,
      options,
    })
  }

  return createShorthandFromValue({
    allowsJSX,
    Component,
    value: valueOrRenderCallback as ShorthandValue<Props>,
    options,
  })
}

export type ShorthandFactory<P> = (
  value: ShorthandValue<P>,
  options?: CreateShorthandOptions<P>,
) => React.ReactElement | null | undefined
// ============================================================
// Factory Creators
// ============================================================
/**
 * @param config - Options passed to factory
 * @returns A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory<
  TStringElement extends keyof JSX.IntrinsicElements,
  P
>(config: {
  /** A ReactClass or string */
  Component: TStringElement
  /** Indicates if factory supports React Elements */
  allowsJSX?: boolean
}): ShorthandFactory<P>
export function createShorthandFactory<
  TFunctionComponent extends React.FunctionComponent,
  P
>(config: { Component: TFunctionComponent; allowsJSX?: boolean }): ShorthandFactory<P>
export function createShorthandFactory<TInstance extends React.Component, P>(config: {
  Component: { new (...args: any[]): TInstance }
  allowsJSX?: boolean
}): ShorthandFactory<P>
export function createShorthandFactory<P>({ Component, allowsJSX }) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, options: CreateShorthandOptions<P>) =>
    createShorthand({
      Component,
      allowsJSX,
      valueOrRenderCallback: val,
      options,
    })
}

// ============================================================
// Private Utils
// ============================================================

function createShorthandFromValue<P>({
  Component,
  value,
  options,
  allowsJSX = true,
}: {
  Component: React.ElementType
  allowsJSX?: boolean
  value?: ShorthandValue<P>
  options?: CreateShorthandOptions<P>
}) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthand() Component must be a string or function.')
  }
  // short circuit noop values
  const valIsNoop = _.isNil(value) || typeof value === 'boolean'
  if (valIsNoop && !options.render) return null

  const valIsPropsObject = _.isPlainObject(value)
  const valIsReactElement = React.isValidElement(value)

  // unhandled type warning
  if (process.env.NODE_ENV !== 'production') {
    const displayName = typeof Component === 'string' ? Component : Component.displayName

    if (!valIsPropsObject && !valIsReactElement && !valIsNoop) {
      /* eslint-disable-next-line no-console */
      console.error(
        [
          `The shorthand prop for "${displayName}" component was passed a JSX element but this slot only supports string|number|object|array|ReactElements.`,
          ' Use null|undefined|boolean for none.',
          ` Received: ${value}`,
        ].join(''),
      )
    }

    if (!allowsJSX && valIsReactElement) {
      /* eslint-disable-next-line no-console */
      console.error(
        [
          `The shorthand prop for "${displayName}" component was passed a JSX element but this slot only supports string|number|object|array.`,
          ' Use null|undefined|boolean for none.',
          ` Received: ${value}`,
        ].join(''),
      )
    }
  }

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const defaultProps = options.defaultProps ? options.defaultProps() : ({} as Props<P>)

  // User's props
  const usersProps =
    (valIsReactElement && ({} as Props<P>)) ||
    (valIsPropsObject && (value as Props<P>)) ||
    ({} as Props<P>)

  // Override props
  const overrideProps: Props<P> =
    typeof options.overrideProps === 'function'
      ? (options.overrideProps({ ...defaultProps, ...usersProps }) as Props<P>)
      : (options.overrideProps as Props<P>) || ({} as Props<P>)

  // Merge props
  const props: Props<P> = { ...defaultProps, ...usersProps, ...overrideProps }

  // Merge className
  if (defaultProps.className || overrideProps.className || usersProps.className) {
    const mergedClassesNames = cx(
      defaultProps.className,
      overrideProps.className,
      usersProps.className,
    )
    ;(props as any).className = _.uniq(mergedClassesNames.split(' ')).join(' ')
  }

  // Merge style
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    ;(props as any).style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style }
  }

  // Merge styles
  if (defaultProps.styles || overrideProps.styles || usersProps.styles) {
    ;(props as any).styles = mergeStyles(
      defaultProps.styles,
      usersProps.styles,
      overrideProps.styles,
    )
  }

  // ----------------------------------------
  // Get key
  // ----------------------------------------
  const { generateKey = true } = options

  // Use key or generate key
  if (generateKey && _.isNil(props.key)) {
    if (valIsReactElement) {
      // use the key from React Element
      const elementKey = (value as React.ReactElement).key
      // <div /> - key is not passed as will be `null`
      // <div key={null} /> - key is passed as `null` and will be stringified
      const isNullKey = elementKey === null

      if (!isNullKey) {
        ;(props as any).key = elementKey
      }
    }
  }

  // Remove the kind prop from the props object
  delete props.kind

  // ----------------------------------------
  // Create Element
  // ----------------------------------------
  const { render } = options
  if (render) {
    return render(Component, props)
  }

  if (typeof props.children === 'function') {
    return props.children(Component, { ...props, children: undefined })
  }

  if (!allowsJSX && valIsReactElement) {
    return null
  }

  // Create ReactElements from built up props
  if (valIsPropsObject || valIsReactElement) {
    return React.createElement(Component, props)
  }

  return null
}

function createShorthandFromRenderCallback<P>({
  Component,
  renderCallback,
  allowsJSX,
  options,
}: {
  Component: React.ReactType
  renderCallback: ShorthandRenderCallback<P>
  allowsJSX?: boolean
  options?: CreateShorthandOptions<P>
}) {
  const render: ShorthandRenderer<P> = (shorthandValue, renderTree) => {
    return createShorthandFromValue({
      Component,
      allowsJSX,
      value: shorthandValue,
      options: {
        ...options,
        ...(renderTree && { render: renderTree }),
      },
    })
  }

  return renderCallback(render)
}
