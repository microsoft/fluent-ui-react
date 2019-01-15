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
    // console.warn('CLASSES', classes)

    return React.cloneElement(element, {
      className: cx(element.props.className, classes),
    })
  }

  return React.cloneElement(element, {
    styles: mergeStyles(element.props.styles || {}, styles),
  })
}

///////////////////////

class Flex extends UIComponent<any, any> {
  static Item: any

  // this one is experimental
  static Gap: any

  renderComponent({ rest: props }) {
    const {
      children,
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
      ...rest
    } = props

    if (props.className) {
      console.warn(props)
    }

    const stylesFromProps = {
      // ...(fluid && { 'flex': 1 }),
      ...(inline && { display: 'inline-flex' }),

      ...(row && { flexDirection: 'row' }),
      ...(column && { flexDirection: 'column' }),

      ...(center && {
        justifyContent: 'center',
        alignItems: 'center',
      }),

      ...(justify && { justifyContent: justify }),
      ...(space && { justifyContent: `space-${space}` }),

      ...(align && { alignItems: align }),

      ...(wrap && { flexWrap: 'wrap' }),
      ...(size && { flexBasis: size }),

      ...rest,
    }

    const flexStyle = {
      display: 'flex',
      background: 'lightgrey',

      ...stylesFromProps,
    }

    return (
      <div style={flexStyle as any} {...className && { className }}>
        {(items && items.map(FlexItem.create)) || children}
      </div>
    )
  }
}

class FlexItem extends UIComponent<any> {
  displayName: 'FlexItem'

  static create: Function

  renderComponent({ rest: props, getClasses }) {
    const { children, align, fluid, shrink, fixed, noShrink, basis, style } = props

    const flexItemStyles = {
      ...(fluid && { flex: 1 }),
      ...((fixed || noShrink) && { flexShrink: 0 }),
      ...(align && { alignSelf: `flex-${align}` }),

      ...(basis && { flexBasis: basis }),

      ...(shrink != null && { flexShrink: shrink ? 1 : 0 }),

      ...style,
    }

    if (typeof children === 'function') {
      return children({
        styles: flexItemStyles,
        classes: getClasses(flexItemStyles),
      })
    }

    // console.warn(children)

    return withStyles(React.Children.only(children), flexItemStyles, getClasses)
  }
}

FlexItem.create = createShorthandFactory(FlexItem, 'children')

Flex.Item = FlexItem

Flex.Gap = props => (
  <div style={{ width: `${props.size}px`, height: `${props.size}px`, display: 'inline-block' }} />
)

export default Flex
