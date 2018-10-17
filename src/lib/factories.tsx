import * as _ from 'lodash'
import * as cx from 'classnames'
import * as React from 'react'
import {
  MapValueToProps,
  ShorthandPrimitive,
  ShorthandRenderFunction,
  ShorthandValue,
  IProps,
} from '../../types/utils'

interface ICreateShorthandOptions {
  /** Override the default render implementation. */
  render?: ShorthandRenderFunction

  /** Default props object */
  defaultProps?: IProps

  /** Override props object or function (called with regular props) */
  overrideProps?: IProps | ((props: IProps) => IProps)

  /** Whether or not automatic key generation is allowed */
  generateKey?: boolean
}
const CREATE_SHORTHAND_DEFAULT_OPTIONS: ICreateShorthandOptions = {
  defaultProps: {},
  overrideProps: {},
  generateKey: true,
}

// ============================================================
// Factories
// ============================================================

/** A more robust React.createElement. It can create elements from primitive values. */
export function createShorthand(
  Component: React.ReactType,
  mapValueToProps: MapValueToProps,
  value?: ShorthandValue,
  options: ICreateShorthandOptions = CREATE_SHORTHAND_DEFAULT_OPTIONS,
): React.ReactElement<IProps> | null | undefined {
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

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const { defaultProps = {} } = options

  // User's props
  const usersProps =
    (valIsReactElement && (value as React.ReactElement<IProps>).props) ||
    (valIsPropsObject && (value as IProps)) ||
    (valIsPrimitive && mapValueToProps(value as ShorthandPrimitive)) ||
    {}

  // Override props
  let { overrideProps } = options
  overrideProps =
    typeof overrideProps === 'function'
      ? overrideProps({ ...defaultProps, ...usersProps })
      : overrideProps || {}

  // Merge props
  const props = { ...defaultProps, ...usersProps, ...overrideProps }

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
    props.styles = _.merge(defaultProps.styles, usersProps.styles, overrideProps.styles)
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

  // ----------------------------------------
  // Create Element
  // ----------------------------------------
  const { render } = options

  if (render) {
    return render(Component, props, props.children)
  }

  // Clone ReactElements
  if (valIsReactElement) return React.cloneElement(value as React.ReactElement<IProps>, props)

  // Create ReactElements from built up props
  if (valIsPrimitive || valIsPropsObject) return <Component {...props} />

  return null
}

// ============================================================
// Factory Creators
// ============================================================

/**
 * Creates a `createShorthand` function that is waiting for a value and options.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory(Component, mapValueToProps) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, options) => createShorthand(Component, mapValueToProps, val, options)
}

// ============================================================
// HTML Factories
// ============================================================
export const createHTMLDivision = createShorthandFactory('div', val => ({ children: val }))
export const createHTMLIframe = createShorthandFactory('iframe', src => ({ src }))
export const createHTMLImage = createShorthandFactory('img', val => ({ src: val }))
export const createHTMLInput = createShorthandFactory('input', val => ({ type: val }))
export const createHTMLLabel = createShorthandFactory('label', val => ({ children: val }))
export const createHTMLParagraph = createShorthandFactory('p', val => ({ children: val }))
