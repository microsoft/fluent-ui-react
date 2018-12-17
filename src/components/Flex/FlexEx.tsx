import * as React from 'react'
import { UIComponent, createShorthandFactory } from '../../../src/lib'

import { mergeStyles } from '../../../src/lib/mergeThemes'
import cx from 'classnames'

// TODO introduce render method for Flex.Item
// <Flex.Item>
//     ({ styles, classes }) => ...
// </Flex.Item>

const withStyles = (element: React.ReactElement<any>, styles, getClasses): any => {
  if ((element.type as any).__isStardust) {
    return React.cloneElement(element, {
      styles: mergeStyles(element.props.styles || {}, styles),
    })
  }

  console.warn('STYLES', styles)

  const classes = getClasses(styles)
  console.warn('CLASSES', classes)

  return React.cloneElement(element, {
    className: cx(element.props.className, classes),
  })
}

///////////////////////

class Flex extends UIComponent<any> {
  static Item: any

  // this one is experimental
  static Gap: any

  renderComponent({ rest: props }) {
    const { children, center, row, column, justify, align, space, inline, items, ...rest } = props

    const stylesFromProps = {
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

      ...rest,
    }

    const flexStyle = {
      display: 'flex',
      background: 'lightgrey',

      ...stylesFromProps,
    }

    return <div style={flexStyle as any}>{(items && items.map(FlexItem.create)) || children}</div>
  }
}

class FlexItem extends UIComponent<any> {
  displayName: 'FlexItem'

  static create: Function

  renderComponent({ rest: props, getClasses }) {
    const { children, align, fillRest, shrink } = props

    const flexItemStyles = {
      ...(align && { alignSelf: `flex-${align}` }),

      ...(shrink != null && { flexShrink: shrink ? 1 : 0 }),

      ...(fillRest && { flex: '1' }),
    }

    console.warn(children)

    return withStyles(React.Children.only(children), flexItemStyles, getClasses)
  }
}

FlexItem.create = createShorthandFactory(FlexItem, 'children')

Flex.Item = FlexItem

Flex.Gap = props => (
  <div style={{ width: `${props.size}px`, height: `${props.size}px`, display: 'inline-block' }} />
)

export default Flex
