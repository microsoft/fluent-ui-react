import * as _ from 'lodash'
import cx from 'classnames'
import * as React from 'react'
import {
  ShorthandValue,
  Props,
  PropsOf,
  ShorthandRenderCallback,
  ShorthandRenderFunction,
  ShorthandRenderer,
} from '../../types/utils'
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
  render: (Component, props) => React.createElement(Component, props),
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
export function createShorthand(
  Component: React.ReactType,
  mappedProp: string,
  valueOrRenderCallback?: ShorthandValue | ShorthandRenderCallback,
  options: CreateShorthandOptions = CREATE_SHORTHAND_DEFAULT_OPTIONS,
): React.ReactElement<Props> | null | undefined {
  const valIsRenderFunction =
    typeof valueOrRenderCallback === 'function' && !React.isValidElement(valueOrRenderCallback)
  if (valIsRenderFunction) {
    return createShorthandFromRenderCallback(
      Component,
      mappedProp,
      valueOrRenderCallback as ShorthandRenderCallback,
      options,
    )
  }

  return createShorthandFromValue(
    Component,
    mappedProp,
    valueOrRenderCallback as ShorthandValue,
    options,
  )
}

// ============================================================
// Factory Creators
// ============================================================
/**
 * @param {React.ReactType} Component A ReactClass or string
 * @param {string} mappedProp A function that maps a primitive value to the Component props
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory<T extends React.ReactType>(
  Component: T,
  mappedProp?: keyof PropsOf<T>,
) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, options) => createShorthand(Component, mappedProp as string, val, options)
}

// ============================================================
// Private Utils
// ============================================================

function createShorthandFromValue(
  Component: React.ReactType,
  mappedProp: string,
  value?: ShorthandValue,
  options: CreateShorthandOptions = CREATE_SHORTHAND_DEFAULT_OPTIONS,
) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthand() Component must be a string or function.')
  }
  // short circuit noop values
  const valIsNoop = _.isNil(value) || typeof value === 'boolean'
  if (valIsNoop && !options.render) return null

  const valIsPrimitive = typeof value === 'string' || typeof value === 'number'
  const valIsPropsObject = _.isPlainObject(value)
  const valIsReactElement = React.isValidElement(value)

  // unhandled type warning
  if (
    process.env.NODE_ENV !== 'production' &&
    !valIsPrimitive &&
    !valIsPropsObject &&
    !valIsReactElement &&
    !valIsNoop
  ) {
    console.error(
      [
        'Shorthand value must be a string|number|object|ReactElements.',
        ' Use null|undefined|boolean for none.',
        ` Received: ${value}`,
      ].join(''),
    )
  }

  // return value 'as is' if it a ReactElement
  if (valIsReactElement) {
    return value as React.ReactElement<Props>
  }

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const { defaultProps = {} } = options

  // User's props
  const usersProps = valIsPropsObject ? (value as Props) : {}

  // Override props
  let { overrideProps } = options
  overrideProps =
    typeof overrideProps === 'function'
      ? (overrideProps as Function)({ ...defaultProps, ...usersProps })
      : overrideProps || {}

  // Merge props
  const props = { ...defaultProps, ...usersProps, ...overrideProps }

  // Map prop for primitive value
  if (valIsPrimitive) {
    props[mappedProps[overrideProps.as || defaultProps.as] || mappedProp || 'children'] = value
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
  if (generateKey && _.isNil(props.key) && valIsPrimitive) {
    // use string/number shorthand values as the key
    props.key = value
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

  // Create ReactElements from built up props
  if (valIsPrimitive || valIsPropsObject) return React.createElement(Component, props)

  return null
}

function createShorthandFromRenderCallback(
  Component: React.ReactType,
  mappedProp: string,
  renderCallback: ShorthandRenderCallback,
  options: CreateShorthandOptions = CREATE_SHORTHAND_DEFAULT_OPTIONS,
) {
  const render: ShorthandRenderer = (shorthandValue, renderTree) => {
    return createShorthandFromValue(Component, mappedProp, shorthandValue, {
      ...options,
      ...(renderTree && { render: renderTree }),
    })
  }

  return renderCallback(render)
}
