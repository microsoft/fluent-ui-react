import * as _ from 'lodash'
import * as cx from 'classnames'
import * as React from 'react'
import {
  ShorthandRenderFunction,
  ShorthandValue,
  Props,
  ShorthandRenderCallback,
  ShorthandRenderTreeFunc,
  ShorthandRenderer,
} from '../../types/utils'
import { mergeStyles } from './mergeThemes'

type HTMLTag = 'iframe' | 'img' | 'input'
type ShorthandProp = 'children' | 'src' | 'type'

interface CreateShorthandOptions {
  /** Override the default render implementation. */
  render?: ShorthandRenderFunction

  /** Default props object */
  defaultProps?: Props

  /** Override props object or function (called with regular props) */
  overrideProps?: Props & ((props: Props) => Props) | Props

  /** Whether or not automatic key generation is allowed */
  generateKey?: boolean
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
export function createShorthand(
  Component: React.ReactType,
  mappedProp: string,
  value?: ShorthandValue,
  options: CreateShorthandOptions = CREATE_SHORTHAND_DEFAULT_OPTIONS,
): React.ReactElement<Props> | null | undefined {
  const valIsRenderFunction = typeof value === 'function' && !React.isValidElement(value)
  if (valIsRenderFunction) {
    const render: ShorthandRenderCallback = (shorthandValueOrRenderTree, renderTreeArg) => {
      const shorthandArgType = {
        isReactElement: React.isValidElement(shorthandValueOrRenderTree),
        isRenderTreeFunc: typeof shorthandValueOrRenderTree === 'function',
      }

      const ShorthandElement = createShorthand(
        Component,
        mappedProp,
        shorthandArgType.isRenderTreeFunc ? {} : (shorthandValueOrRenderTree as ShorthandValue),
        options,
      )

      const renderTree =
        (shorthandArgType.isRenderTreeFunc &&
          (shorthandValueOrRenderTree as ShorthandRenderTreeFunc)) ||
        renderTreeArg

      return shorthandArgType.isReactElement || !renderTree
        ? ShorthandElement
        : renderTree(Component, ShorthandElement ? ShorthandElement.props : {})
    }

    return (value as ShorthandRenderer)(render)
  }

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
    (valIsReactElement && (value as React.ReactElement<Props>).props) ||
    (valIsPropsObject && (value as Props)) ||
    {}

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

  // ----------------------------------------
  // Create Element
  // ----------------------------------------
  const { render } = options

  if (render) {
    return render(Component, props, props.children)
  }

  // Clone ReactElements
  if (valIsReactElement) return React.cloneElement(value as React.ReactElement<Props>, props)

  // Create ReactElements from built up props
  if (valIsPrimitive || valIsPropsObject) return <Component {...props} />

  return null
}

// ============================================================
// Factory Creators
// ============================================================

/**
 * @param {React.ReactType} Component A ReactClass or string
 * @param {string} mappedProp A function that maps a primitive value to the Component props
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory(Component: React.ReactType, mappedProp?: string) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, options) => createShorthand(Component, mappedProp, val, options)
}
