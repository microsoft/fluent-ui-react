import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import { UIComponent, commonPropTypes } from '../../lib'
import { mergeStyles } from '../../lib/mergeThemes'
import { Extendable } from '../../types'

export type FlexItemSize = 'size.half' | 'size.quarter' | 'size.small' | 'size.medium'

export interface FlexItemProps {
  /** Controls item's alignment. */
  align?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'

  /** Defines size of the item. */
  size?: FlexItemSize

  /**
   * Item can fill remaining space of the container.
   * If numeric value is provided, remaining space will be distributed proportionally between all the items.
   * */
  grow?: boolean | number

  /**
   * Controls item's ability to shrink.
   * */
  shrink?: boolean | number

  /**
   * Item can be pushed towards opposite side in the container's direction.
   */
  push?: boolean

  /**
   * IGNORE (will be refactored and not exposed via API).
   * Value is automatically set by parent Flex component.
   */
  flexDirection?: 'row' | 'column'
}

class FlexItem extends UIComponent<Extendable<FlexItemProps>> {
  static className = 'ui-flex__item'

  static displayName = 'FlexItem'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    align: PropTypes.oneOf(['auto', 'start', 'end', 'center', 'baseline', 'stretch']),
    size: PropTypes.string,

    stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    shrink: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

    push: PropTypes.bool,

    /**
     * Will be automatically set by parent Flex component
     */
    flexDirection: PropTypes.oneOf(['row', 'column']),
  }

  displayName: 'FlexItem'

  static create: Function

  // Boolean flag for now, Symbol-based approach may be used instead.
  // However, there are  concerns related to browser compatibility if Symbols will be used.
  // Completely alternative approach - check class name of React element (and generalize this logic).
  static __isFlexItem = true

  renderComponent({ styles, classes }) {
    const { children } = this.props

    // pass calculated bits using Render Props pattern
    if (typeof children === 'function') {
      return children({
        styles: styles.root,
        classes: classes.root,
      })
    }

    return withStyles(React.Children.only(children), styles, classes)
  }
}

export default FlexItem

const withStyles = (element: React.ReactElement<any>, styles, classes): React.ReactElement<any> => {
  if (!styles) {
    return element
  }

  // if element is DOM element
  if (typeof element.type === 'string') {
    return React.cloneElement(element, {
      className: cx(element.props.className, classes.root),
    })
  }

  // assuming element is Stardust element
  return React.cloneElement(element, {
    styles: mergeStyles(element.props.styles || {}, styles.root),
  })
}
