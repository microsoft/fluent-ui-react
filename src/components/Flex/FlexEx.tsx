import * as React from 'react'
import { UIComponent, createShorthandFactory } from '../../../src/lib'

import { mergeStyles } from '../../../src/lib/mergeThemes'
import cx from 'classnames'

/**
 * This logic seems to be a reasonable piece, however, in future we might consider the following functionality
 * - introduce setup component that will pass Flex settings via React context. The main thing client might want to configure is target prop
 * - however, this setting shouldn't affect Stardust components - as for them it should be still a `styles` prop used as a target
 *  - and here is the task we might need to address
 */
const withStyles = (element: React.ReactElement<any>, styles, getClasses): any => {
  if (typeof element.type === 'string') {
    const classes = getClasses(styles)

    return React.cloneElement(element, {
      className: cx(element.props.className, classes),
    })
  }

  return React.cloneElement(element, {
    styles: mergeStyles(element.props.styles || {}, styles),
  })
}

const toFlexAlignment = shorthandValue => {
  const trimmedValue = shorthandValue.trim()

  if (trimmedValue === 'start' || trimmedValue === 'end') {
    return `flex-${trimmedValue}`
  }

  return trimmedValue
}

const toFlexItemSizeValues = sizeValue => {
  const starValueMatch = sizeValue.match(/([0-9\.]+?)?[\*]/)

  if (starValueMatch) {
    return {
      flexGrow: starValueMatch[1] || 1,
      flexShrink: 1,
      flexBasis: 0,
    }
  }

  return { flexBasis: sizeValue }
}

///////////////////////
/**
 * The rest to support
 * - support star sizes
 * - support Row and Column
 * - support 'gap' with margin technique
 */
//////

class Flex extends UIComponent<any, any> {
  static Item: any

  // TODO implement
  static Row: any
  static Column: any

  // this one is experimental
  static Gap: any

  renderComponent({ rest: props }) {
    const {
      children,
      as,
      center,
      row,
      column,
      fluid,
      justify,
      align,
      space,
      inline,
      wrap,
      items,
      size,
      className,

      // experimental syntax
      hAlign,
      vAlign,

      style,
      styles,
      ...rest
    } = props

    const stylesFromProps = {
      // ...(fluid && { 'flex': 1 }),
      ...(inline && { display: 'inline-flex' }),

      ...(row && { flexDirection: 'row' }),
      ...(column && { flexDirection: 'column' }),

      ...(center && {
        justifyContent: 'center',
        alignItems: 'center',
      }),

      ...(justify && { justifyContent: toFlexAlignment(justify) }),
      ...(space && { justifyContent: `space-${space}` }),

      ...(align && { alignItems: toFlexAlignment(align) }),

      ...(wrap && { flexWrap: 'wrap' }),
      ...(size && { flexBasis: size }),

      // EXPERIMENTAL alignment syntax
      // note - too much copypaste!!
      ...(hAlign &&
        (column
          ? { alignItems: toFlexAlignment(hAlign) }
          : { justifyContent: toFlexAlignment(hAlign) })),
      ...(vAlign &&
        (column
          ? { justifyContent: toFlexAlignment(vAlign) }
          : { alignItems: toFlexAlignment(vAlign) })),

      ...rest,
    }

    const flexStyles = mergeStyles(stylesFromProps, styles || {})

    const flexStyle = {
      display: 'flex',
      background: 'lightgrey',

      ...flexStyles(),

      ...style,
    }

    const ElementType = as || 'div'

    return (
      <ElementType style={flexStyle as any} {...className && { className }}>
        {(items && items.map(FlexItem.create)) || children}
      </ElementType>
    )
  }
}

class FlexItem extends UIComponent<any> {
  displayName: 'FlexItem'

  static create: Function

  renderComponent({ rest: props, getClasses }) {
    const {
      children,
      align,

      basis,
      size,

      stretch,
      noShrink,
      push,
      style,
    } = props

    const flexItemStyles = {
      ...(stretch && { flex: '1 1 auto' }), // obsolete?

      ...(noShrink && { flexShrink: 0 }), // or shrink='false'?

      ...(align && { alignSelf: toFlexAlignment(align) }),

      ...(basis && { flexBasis: basis }), // obsolete?
      ...(size && toFlexItemSizeValues(size)),

      ...(push && { marginLeft: 'auto' }),

      ...style,
    }

    if (typeof children === 'function') {
      return children({
        styles: flexItemStyles,
        classes: getClasses(flexItemStyles),
      })
    }

    return withStyles(React.Children.only(children), flexItemStyles, getClasses)
  }
}

FlexItem.create = createShorthandFactory(FlexItem, 'children')

Flex.Item = FlexItem

Flex.Gap = props => (
  <div style={{ width: `${props.size}px`, height: `${props.size}px`, display: 'inline-block' }} />
)

export default Flex
