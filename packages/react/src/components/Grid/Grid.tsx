import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'

export interface GridProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<React.ReactNode | React.ReactNode[]> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available gridBehavior, gridHorizontalBehavior
   * */
  accessibility?: Accessibility

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: string | number

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: string | number
}

class Grid extends UIComponent<WithAsProp<GridProps>, any> {
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
  }

  static defaultProps: WithAsProp<GridProps> = {
    as: 'div',
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
 * A grid is used to harmonize negative space in a layout.
 */
export default withSafeTypeForAs<typeof Grid, GridProps>(Grid)
