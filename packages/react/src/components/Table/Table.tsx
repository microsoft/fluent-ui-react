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

export interface TableSlotClassNames {
  header: string
}

export interface TableProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /** The columns of the Table with a space-separated list of values.
   */
  header?: TableRowProps

  /** The rows of the Table with a space-separated list of values.
   */
  rows?: ShorthandCollection<TableCellProps>

  /**
   * Render table in compact mode
   */
  compact?: boolean
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
    compact: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
  }

  renderRows(variables: ComponentVariablesObject) {
    const { rows, compact } = this.props

    return _.map(rows, (row: TableRowProps, index: number) => {
      const props = {
        ...row,
        role: 'rowgroup',
        compact,
      } as TableRowProps
      const overrideProps = handleVariablesOverrides(variables)
      return TableRow.create(row, { defaultProps: props, overrideProps })
    })
  }

  renderHeader(variables: ComponentVariablesObject) {
    const { header, compact } = this.props
    if (!header) {
      return null
    }

    const headerRowProps = {
      ...header,
      role: 'rowgroup',
      isHeader: true,
      compact,
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
