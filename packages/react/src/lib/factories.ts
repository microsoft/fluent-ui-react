import cx from 'classnames'
import * as _ from 'lodash'
import * as React from 'react'
import {
  ShorthandValue,
  Props,
  PropsOf,
  ShorthandRenderCallback,
  ShorthandRenderFunction,
  ShorthandRenderer,
} from '../types'
import { mergeStyles } from './mergeThemes'

type HTMLTag = 'iframe' | 'img' | 'input'
type ShorthandProp = 'children' | 'src' | 'type'

interface CreateShorthandOptions {
  /** Default props object */
  defaultProps?: Props

  /** Override props object or function (called with regular props) */
  overrideProps?: Props & ((props: Props) => Props) | Props

  /** Whether or not automatic key generation is allowed */
  generateKey?: boolean

  /** Override the default render implementation. */
  render?: ShorthandRenderFunction
}

const CREATE_SHORTHAND_DEFAULT_OPTIONS: CreateShorthandOptions = {
  defaultProps: {},
  overrideProps: {},
  generateKey: true,
}

// It's only necessary to map props that don't use 'children' as value ('children' is the default)
const mappedProps: { [key in HTMLTag]: ShorthandProp } = {
  iframe: 'src',
  img: 'src',
  input: 'type',
}

// ============================================================
// Factories
// ============================================================

/** A more robust React.createElement. It can create elements from primitive values. */
export function createShorthand({
  allowsJSX,
  Component,
  mappedProp,
  mappedArrayProp,
  valueOrRenderCallback,
  options = CREATE_SHORTHAND_DEFAULT_OPTIONS,
}: {
  Component: React.ElementType
  allowsJSX?: boolean
  mappedProp?: string
  mappedArrayProp?: string
  valueOrRenderCallback?: ShorthandValue<Props> | ShorthandRenderCallback
  options?: CreateShorthandOptions
}): React.ReactElement<Props> | null | undefined {
  const valIsRenderFunction =
    typeof valueOrRenderCallback === 'function' && !React.isValidElement(valueOrRenderCallback)
  if (valIsRenderFunction) {
    return createShorthandFromRenderCallback({
      allowsJSX,
      Component,
      renderCallback: valueOrRenderCallback as ShorthandRenderCallback,
      mappedProp,
      mappedArrayProp,
      options,
    })
  }

  return createShorthandFromValue({
    allowsJSX,
    Component,
    mappedProp,
    mappedArrayProp,
    value: valueOrRenderCallback as ShorthandValue<Props>,
    options,
  })
}

type CreateShorthandFactoryConfigInner<TPropName = string> = {
  allowsJSX?: boolean
  Component: React.ElementType
  mappedProp?: TPropName
  mappedArrayProp?: TPropName
}
export type CreateShorthandFactoryConfig = CreateShorthandFactoryConfigInner
export type ShorthandFactory<P> = (
  value: ShorthandValue<P>,
  options?: CreateShorthandOptions,
) => React.ReactElement | null | undefined
// ============================================================
// Factory Creators
// ============================================================
/**
 * @param {Object} config Options passed to factory
 * @param {React.ElementType} config.Component A ReactClass or string
 * @param {string} config.mappedProp A function that maps a primitive value to the Component props
 * @param {string} config.mappedArrayProp A function that maps an array value to the Component props
 * @param {string} config.allowsJSX Indicates if factory supports React Elements
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory<
  TStringElement extends keyof JSX.IntrinsicElements,
  P
>(config: {
  Component: TStringElement
  mappedProp?: keyof PropsOf<TStringElement>
  mappedArrayProp?: keyof PropsOf<TStringElement>
  allowsJSX?: boolean
}): ShorthandFactory<P>
export function createShorthandFactory<
  TFunctionComponent extends React.FunctionComponent,
  P
>(config: {
  Component: TFunctionComponent
  mappedProp?: keyof PropsOf<TFunctionComponent>
  mappedArrayProp?: keyof PropsOf<TFunctionComponent>
  allowsJSX?: boolean
}): ShorthandFactory<P>
export function createShorthandFactory<TInstance extends React.Component, P>(config: {
  Component: { new (...args: any[]): TInstance }
  mappedProp?: keyof PropsOf<TInstance>
  mappedArrayProp?: keyof PropsOf<TInstance>
  allowsJSX?: boolean
}): ShorthandFactory<P>
export function createShorthandFactory({ Component, mappedProp, mappedArrayProp, allowsJSX }) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, options: CreateShorthandOptions) =>
    createShorthand({
      Component,
      mappedProp,
      mappedArrayProp,
      allowsJSX,
      valueOrRenderCallback: val,
      options,
    })
}

// ============================================================
// Private Utils
// ============================================================

function createShorthandFromValue({
  Component,
  mappedProp,
  mappedArrayProp,
  value,
  options,
  allowsJSX = true,
}: {
  Component: React.ElementType
  mappedProp?: string
  mappedArrayProp?: string
  allowsJSX?: boolean
  value?: ShorthandValue<Props>
  options?: CreateShorthandOptions
}) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthand() Component must be a string or function.')
  }
  // short circuit noop values
  const valIsNoop = _.isNil(value) || typeof value === 'boolean'
  if (valIsNoop && !options.render) return null

  const valIsPrimitive = typeof value === 'string' || typeof value === 'number'
  const valIsPropsObject = _.isPlainObject(value)
  const valIsArray = _.isArray(value)
  const valIsReactElement = React.isValidElement(value)

  // unhandled type warning
  if (process.env.NODE_ENV !== 'production') {
    const displayName = typeof Component === 'string' ? Component : Component.displayName

    if (!valIsPrimitive && !valIsPropsObject && !valIsArray && !valIsReactElement && !valIsNoop) {
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
  const { defaultProps = {} } = options

  // User's props
  const usersProps = (valIsReactElement && {}) || (valIsPropsObject && (value as Props)) || {}

  // Override props
  let { overrideProps } = options
  overrideProps =
    typeof overrideProps === 'function'
      ? (overrideProps as Function)({ ...defaultProps, ...usersProps })
      : overrideProps || {}

  // Merge props
  const props = { ...defaultProps, ...usersProps, ...overrideProps }

  const mappedHTMLProps = mappedProps[overrideProps.as || defaultProps.as]

  // Map prop for primitive value
  if (valIsPrimitive || valIsReactElement) {
    props[mappedHTMLProps || mappedProp || 'children'] = value
  }

  // Map prop for array value
  if (valIsArray) {
    props[mappedHTMLProps || mappedArrayProp || 'children'] = value
  }

  // Merge className
  if (defaultProps.className || overrideProps.className || usersProps.className) {
    const mergedClassesNames = cx(
      defaultProps.className,
      overrideProps.className,
      usersProps.className,
    )
    props.className = _.uniq(mergedClassesNames.split(' ')).join(' ')
  }

  // Merge style
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style }
  }

  // Merge styles
  if (defaultProps.styles || overrideProps.styles || usersProps.styles) {
    props.styles = mergeStyles(defaultProps.styles, usersProps.styles, overrideProps.styles)
  }

  // ----------------------------------------
  // Get key
  // ----------------------------------------
  const { generateKey = true } = options

  // Use key or generate key
  if (generateKey && _.isNil(props.key)) {
    if (valIsPrimitive) {
      // use string/number shorthand values as the key
      props.key = value
    }

    if (valIsReactElement) {
      // use the key from React Element
      const elementKey = (value as React.ReactElement).key
      // <div /> - key is not passed as will be `null`
      // <div key={null} /> - key is passed as `null` and will be stringified
      const isNullKey = elementKey === null

      if (!isNullKey) {
        props.key = elementKey
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

  if (!allowsJSX && valIsReactElement) {
    return null
  }

  // Create ReactElements from built up props
  if (valIsPrimitive || valIsPropsObject || valIsArray || valIsReactElement) {
    return React.createElement(Component, props)
  }

  return null
}

function createShorthandFromRenderCallback({
  Component,
  renderCallback,
  mappedProp,
  mappedArrayProp,
  allowsJSX,
  options,
}: {
  Component: React.ReactType
  renderCallback: ShorthandRenderCallback
  mappedProp?: string
  mappedArrayProp?: string
  allowsJSX?: boolean
  options?: CreateShorthandOptions
}) {
  const render: ShorthandRenderer<Props> = (shorthandValue, renderTree) => {
    return createShorthandFromValue({
      Component,
      mappedProp,
      mappedArrayProp,
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
