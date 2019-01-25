import * as React from 'react'
import { UIComponent, createShorthandFactory } from '../../../src/lib'

import { mergeStyles } from '../../../src/lib/mergeThemes'
import cx from 'classnames'

/**
 * This logic seems to be a reasonable piece, however, in future we might consider the following functionality
 * - introduce setup component that will pass Flex settings via React context. The main thing client might want to configure is target prop
 * - however, this setting shouldn't affect Stardust components - as for them it should be still a `styles` prop used as a target
 *    - and here is the task we might need to address
 *
 * FINAL THINGS TO IMPLEMENT
 * - introduce proper strategy to handle 'push' prop (DONE)
 * - introduce GAP implementation
 *  - this one should be 'margin-based'
 *    - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items
 *    - https://tburleson-layouts-demos.firebaseapp.com/#/docs
 *
 *
 *
 * So, essentially, what our gaps strategy should be?
 *  - start with the simplest case - there is no wrapping involved, we need just to set right/left margin
 *  - at the same time, we should allow to handle wrapped cases
 */
const withStyles = (element: React.ReactElement<any>, styles, getClasses): any => {
  if (!styles) {
    return element
  }

  if (typeof element.type === 'string') {
    const classes = getClasses(styles)

    return React.cloneElement(element, {
      className: cx(element.props.className, classes),
    })
  }

  if ((element.type as any).__isFlexItem) {
    return React.cloneElement(element, {
      itemStyles: styles,
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
  return {
    flexBasis: sizeValue,
  }
}

const renderChildren = (children, props, getClasses) => {
  const { column, gap } = props

  let isFirst = true
  return React.Children.map(children, (child: React.ReactElement<any>) => {
    const childElement =
      (child.type as any) && (child.type as any).__isFlexItem
        ? React.cloneElement(child, {
            flexDirection: column ? 'column' : 'row',
          })
        : child

    return (
      <>
        {!isFirst && gap ? <Flex.Gap gap={gap} column={column} /> : void (isFirst = false)}
        {childElement}
      </>
    )
  })
}

const declareFlexComponent = (rowOrColumn: string, defaultProps = {}) => {
  class Flex extends UIComponent<any, any> {
    static Item: any

    static Row: any
    static Column: any

    static Gap

    static defaultProps = {
      row: rowOrColumn === 'row',
      column: rowOrColumn === 'column',
      ...defaultProps,
    }

    // TOOO this one is sloppy
    static displayName = rowOrColumn ? `Flex.${rowOrColumn}` : 'Flex'

    renderComponent({ getClasses, rest: props }) {
      const {
        children,
        as,

        inline,

        row,
        column,

        center,

        space,

        wrap,
        items,

        className,

        hAlign,
        vAlign,

        style,
        styles,

        gap,

        // NOTE - experimental
        padding,

        debug,

        fill,

        ...rest
      } = props

      const stylesFromProps = {
        ...(inline && { display: 'inline-flex' }),

        ...(row && { flexDirection: 'row' }),
        ...(column && { flexDirection: 'column' }),

        ...(center && {
          justifyContent: 'center',
          alignItems: 'center',
        }),

        // TODO note - too much copypaste!!
        ...(hAlign &&
          (column
            ? { alignItems: toFlexAlignment(hAlign) }
            : { justifyContent: toFlexAlignment(hAlign) })),
        ...(vAlign &&
          (column
            ? { justifyContent: toFlexAlignment(vAlign) }
            : { alignItems: toFlexAlignment(vAlign) })),

        ...(space && { justifyContent: `space-${space}` }),

        ...(wrap && { flexWrap: 'wrap' }),

        // NOTE - EXPERIMENTAL PROPS //
        ...(fill && {
          height: '100%',
        }),

        ...(padding && { padding }),

        ////////////////////////////

        ...rest,
      }

      const flexStyles = mergeStyles(stylesFromProps, styles || {})

      const flexStyle = {
        display: 'flex',
        ...(debug && { border: '1px dotted grey', background: 'lightgrey' }),

        ...flexStyles(),

        ...style,
      }

      const ElementType = as || 'div'

      return (
        <ElementType style={flexStyle as any} {...className && { className }}>
          {(items && items.map(FlexItem.create)) || renderChildren(children, props, getClasses)}
        </ElementType>
      )
    }
  }

  return Flex
}

const Flex = declareFlexComponent('row')
Flex.Row = Flex
Flex.Column = declareFlexComponent('column')

Flex.Gap = ({ gap, column }) => <div style={column ? { height: gap } : { width: gap }} />

class FlexItem extends UIComponent<any> {
  displayName: 'FlexItem'

  // TODO for now, Symbol-based approach should be used instead
  static __isFlexItem = true

  static create: Function

  renderComponent({ rest: props, getClasses }) {
    const {
      children,
      align,

      size,

      stretch, // or canonical 'grow'? Stretch is more intuitive
      shrink,

      push,

      style,

      itemStyles, // just because of lack of Stardust support

      flexDirection,
    } = props

    const flexItemStyles = {
      ...(align && { alignSelf: toFlexAlignment(align) }),

      ...(size && toFlexItemSizeValues(size)),

      ...(shrink && { flexShrink: shrink }),
      ...(shrink === false && { flexShrink: 0 }),

      ...(stretch && { flexGrow: stretch }),
      ...(stretch === true && { flexGrow: 1 }),

      ...itemStyles,
      ...(push && (flexDirection === 'column' ? { marginTop: 'auto' } : { marginLeft: 'auto' })),

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

export default Flex
