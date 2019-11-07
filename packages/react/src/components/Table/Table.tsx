import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import {
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  UIComponent,
} from '../../lib'
import { ComponentVariablesObject } from '../../themes/types'
import { mergeComponentVariables } from '../../lib/mergeThemes'
import TableRow, { TableRowProps } from './TableRow'
import TableCell, { TableCellProps } from './TableCell'
import { WithAsProp, ShorthandCollection } from '../../types'
import { Accessibility } from '@stardust-ui/accessibility'

export interface TableHeaderProps extends UIComponentProps {
  items: ShorthandCollection<TableCellProps>
}

export interface TableSlotClassNames {
  header: string
}

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /** The columns of the Table with a space-separated list of values.
   * The values represent the track size, and the space between them represents the Table line. */
  header?: TableHeaderProps

  /** The rows of the Table with a space-separated list of values.
   * The values represent the track size, and the space between them represents the Table line. */
  rows?: ShorthandCollection<TableCellProps>
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
})

/**
 * A Table is used to display data in tabular layout
 */
class Table extends UIComponent<WithAsProp<TableProps>> {
  static displayName = 'Table'
  static className = 'ui-table'

  static Cell = TableCell
  static Row = TableRow

  static slotClassNames: TableSlotClassNames = {
    header: `${Table.className}__header`,
  }

  rowsCount: number
  columsCount: number

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
    header: customPropTypes.itemShorthand,
    rows: customPropTypes.collectionShorthand,
  }

  static defaultProps = {
    as: 'div',
  }

  constructor(props, context) {
    super(props, context)

    const { rows, header } = this.props
    this.rowsCount = (rows ? rows.length : 0) + (header ? 1 : 0)
    this.columsCount = header && (header as TableRowProps).items.length
  }

  renderRows(variables: ComponentVariablesObject) {
    const { rows } = this.props

    return _.map(rows, (row: TableRowProps, index: number) => {
      const props = {
        ...row,
        rowIndex: this.props.header ? index + 1 : index,
        role: 'rowgroup',
      } as TableRowProps
      const overrideProps = handleVariablesOverrides(variables)
      return TableRow.create(row, { defaultProps: props, overrideProps })
    })
  }

  renderHeader(variables: ComponentVariablesObject) {
    const header = this.props.header as TableRowProps
    if (!header) {
      return null
    }
    const headerRowProps = {
      ...header,
      rowIndex: 0,
      role: 'rowgroup',
      isHeader: true,
    } as TableRowProps

    const overrideProps = handleVariablesOverrides(variables)

    return TableRow.create(headerRowProps, {
      defaultProps: {
        className: Table.slotClassNames.header,
      },
      overrideProps,
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...unhandledProps}
      >
        {/* <thead> */}
        {this.renderHeader(variables)}
        {/* </thead> */}
        {/* <tbody> */}
        {this.renderRows(variables)}
        {/* </tbody> */}
      </ElementType>
    )
  }
}

export default Table
