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
  isFromKeyboard,
} from '../../lib'

import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/FocusZone'
import * as _ from 'lodash'

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

  /** A custom item can be focused. */
  focusable?: boolean

  /** A custom item can't be actionable. */
  onClick: never

  /**
   * Called after user's focus. Will be called only if the item is focusable.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarCustomItemProps>

  /**
   * Called after item blur. Will be called only if the item is focusable.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarCustomItemProps>
}

interface ToolbarCustomItemState {
  isFromKeyboard: boolean
}

class ToolbarCustomItem extends UIComponent<
  WithAsProp<ToolbarCustomItemProps>,
  ToolbarCustomItemState
> {
  static displayName = 'ToolbarCustomItem'

  static className = 'ui-toolbar__customitem'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),
    focusable: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  handleBlur = (e: React.SyntheticEvent) => {
    if (this.props.focusable) {
      this.setState({ isFromKeyboard: false })
      _.invoke(this.props, 'onBlur', e, this.props)
    }
  }

  handleFocus = (e: React.SyntheticEvent) => {
    if (this.props.focusable) {
      this.setState({ isFromKeyboard: isFromKeyboard() })
      _.invoke(this.props, 'onFocus', e, this.props)
    }
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children, content, focusable } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...{ [IS_FOCUSABLE_ATTRIBUTE]: focusable }}
        {...unhandledProps}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
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
