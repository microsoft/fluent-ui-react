import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import {
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import TableHeader from './TableHeader'
import TableRow, { TableRowProps } from './TableRow'
import { ReactProps, ShorthandValue } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

// type CellType = ReactNode | string
// type RowType = CellType[]
// type RowsType = RowType[]

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * @available TableBehavior
   * */
  accessibility?: Accessibility

  /** The columns of the Table with a space-separated list of values. The values represent the track size, and the space between them represents the Table line. */
  headers?: ShorthandValue[]

  /** The rows of the Table with a space-separated list of values. The values represent the track size, and the space between them represents the Table line. */
  rows?: ShorthandValue[]
}

/**
 * A Table is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Table extends UIComponent<ReactProps<TableProps>, any> {
  public static displayName = 'Table'

  public static className = 'ui-Table'

  public static propTypes = {
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
    headers: customPropTypes.collectionShorthand,
    rows: customPropTypes.collectionShorthand,
  }

  public static defaultProps: TableProps = {
    as: 'table',
    accessibility: defaultBehavior,
  }

  public renderHeaders() {
    const { headers } = this.props

    return (
      <tr>
        {_.map(headers, header => {
          return <th data-is-focusable="true">{header}</th>
        })}
      </tr>
    )
  }

  public renderRows() {
    const { rows } = this.props

    return _.map(rows, (row: TableRowProps) => {
      return <TableRow {...row} />
    })
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { headers } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        <TableHeader items={headers} />
        {this.renderRows()}
      </ElementType>
    )
  }
}

export default Table
