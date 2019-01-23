import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
  UIComponent,
  childrenExist,
  customPropTypes,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../lib'
import { ReactProps } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import ReactNode = React.ReactNode

export interface GridProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<React.ReactNode | React.ReactNode[]> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * @available gridBehavior
   * */
  accessibility?: Accessibility

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: string | number

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: string | number
}

/**
 * A grid is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Grid extends UIComponent<ReactProps<GridProps>, any> {
  public static displayName = 'Grid'

  public static className = 'ui-grid'

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
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

  public static defaultProps: GridProps = {
    as: 'div',
    accessibility: defaultBehavior,
  }

  public renderComponent({
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Grid
