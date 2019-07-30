import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
  isFromKeyboard,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs, ComponentEventHandler } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'

export interface GridProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available gridBehavior, gridHorizontalBehavior
   * */
  accessibility?: Accessibility

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: string | number

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: string | number

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<GridProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<GridProps>
}

interface GridState {
  isFromKeyboard: boolean
}

class Grid extends UIComponent<WithAsProp<GridProps>, GridState> {
  static displayName = 'Grid'

  static className = 'ui-grid'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps: WithAsProp<GridProps> = {
    as: 'div',
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

/**
 * A Grid is a layout component that harmonizes negative space, by controlling both the row and column alignment.
 */
export default withSafeTypeForAs<typeof Grid, GridProps>(Grid)
