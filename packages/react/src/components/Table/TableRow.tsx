import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import {
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  createShorthandFactory,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { ShorthandCollection, WithAsProp } from '../../types'
import { Accessibility, tableHeaderCellBehavior } from '@stardust-ui/accessibility'
import { ComponentVariablesObject } from '../../themes/types'
import { mergeComponentVariables } from '../../lib/mergeThemes'

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /**
   * Row cells
   */
  items?: ShorthandCollection<TableCellProps>

  /**
   * Is the row a table header
   */
  isHeader?: boolean

  /**
   * Render table in compact mode
   */
  compact?: boolean
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
})

/**
 * Component represents a single row in a tabular structure
 */
class TableRow extends UIComponent<WithAsProp<TableRowProps>, any> {
  static displayName = 'TableRow'

  static className = 'ui-table__row'

  static create: ShorthandFactory<TableRowProps>

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
    items: customPropTypes.collectionShorthand,
    isHeader: PropTypes.bool,
    compact: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
  }

  renderCells(variables: ComponentVariablesObject) {
    const { items, isHeader } = this.props

    return _.map(items, (item: TableCellProps, index: number) => {
      const cellProps = {
        ...item,
        ...(isHeader && {
          accessibility: tableHeaderCellBehavior,
        }),
      }
      const overrideProps = handleVariablesOverrides(variables)
      return TableCell.create(item, { defaultProps: cellProps, overrideProps })
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
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {this.renderCells(variables)}
      </ElementType>
    )
  }
}

TableRow.create = createShorthandFactory({ Component: TableRow })

export default TableRow
