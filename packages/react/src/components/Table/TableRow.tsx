import * as customPropTypes from '@fluentui/react-proptypes'
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
  childrenExist,
} from '../../utils'
import { ShorthandCollection, WithAsProp } from '../../types'
import { Accessibility, tableHeaderCellBehavior, tableRowBehavior } from '@fluentui/accessibility'
import { ComponentVariablesObject } from '../../themes/types'
import { mergeComponentVariables } from '../../utils/mergeThemes'

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
  header?: boolean

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
    header: PropTypes.bool,
    compact: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: tableRowBehavior as Accessibility,
  }

  renderCells(variables: ComponentVariablesObject) {
    const { items, header } = this.props

    return _.map(items, (item: TableCellProps, index: number) => {
      const cellProps = {
        ...(header && {
          accessibility: tableHeaderCellBehavior as Accessibility,
        }),
      }
      const overrideProps = handleVariablesOverrides(variables)
      return TableCell.create(item, { defaultProps: () => cellProps, overrideProps })
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    variables,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { children } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {hasChildren && children}
        {!hasChildren && this.renderCells(variables)}
      </ElementType>
    )
  }
}

TableRow.create = createShorthandFactory({ Component: TableRow, mappedArrayProp: 'items' })

export default TableRow
