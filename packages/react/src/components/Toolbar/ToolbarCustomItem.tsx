import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
} from '../../lib'

import { WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface ToolbarCustomItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A custom item can remove element padding, vertically or horizontally. */
  fitted?: boolean | 'horizontally' | 'vertically'
}

class ToolbarCustomItem extends UIComponent<WithAsProp<ToolbarCustomItemProps>> {
  static displayName = 'ToolbarCustomItem'

  static className = 'ui-toolbar__custom-item'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children, content } = this.props
    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ToolbarCustomItem.create = createShorthandFactory({
  Component: ToolbarCustomItem,
  mappedProp: 'content',
})

/**
 * Custom toolbar item.
 * The item renders as a non-focusable div with custom content inside.
 */
export default withSafeTypeForAs<typeof ToolbarCustomItem, ToolbarCustomItemProps>(
  ToolbarCustomItem,
)
