import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import { UIComponent, commonPropTypes } from '../../lib'
import { Extendable } from '../../../types/utils'
import { mergeStyles } from '../../../src/lib/mergeThemes'

export interface FlexItemProps {
  /** Controls item's alignment. */
  align?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'

  /** Defines size of the item. */
  size?: string

  /**
   * Item can fill remaining space of the container.
   * If numeric value is provided, remaining space will be distributed proportionally between all the items.
   * */
  stretch?: boolean | number

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
   * Will be automatically set by parent Flex component
   */
  flexDirection?: 'row' | 'column'
}

class FlexItem extends UIComponent<Extendable<FlexItemProps>> {
  static className = 'ui-flexItem'

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

  // TODO for now, Symbol-based approach should be used instead
  static __isFlexItem = true

  static create: Function

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

const withStyles = (element: React.ReactElement<any>, styles, classes): any => {
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
