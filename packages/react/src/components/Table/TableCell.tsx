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
  ShorthandFactory,
  createShorthandFactory,
} from '../../lib'

import { WithAsProp } from '../../types'
import { Accessibility } from '@stardust-ui/accessibility'

export interface TableCellProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<React.ReactNode | React.ReactNode[]> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility

  /**
   * Cell's index in the row
   */
  cellIndex?: number
}

/**
 * Component represents a table cell
 *
 */
class TableCell extends UIComponent<WithAsProp<any>, any> {
  static displayName = 'TableCell'

  static className = 'ui-table__cell'

  static create: ShorthandFactory<TableCellProps>

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    isHeader: PropTypes.bool,
    cellIndex: PropTypes.number,
  }

  static defaultProps = {
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
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

TableCell.create = createShorthandFactory({ Component: TableCell })

export default TableCell
