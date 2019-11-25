import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableHeaderCell, { TableHeaderCellProps } from './TableHeaderCell'
import {
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  createShorthandFactory,
  applyAccessibilityKeyHandlers,
  childrenExist,
} from '../../lib'
import { ShorthandCollection, WithAsProp } from '../../types'
import { Accessibility, tableRowBehavior } from '@stardust-ui/accessibility'
import { ComponentVariablesObject } from '../../themes/types'
import { mergeComponentVariables } from '../../lib/mergeThemes'

export interface TableHeaderRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility

  /**
   * Row cells
   */
  items?: ShorthandCollection<TableHeaderCellProps>

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
class TableHeaderRow extends UIComponent<WithAsProp<TableHeaderRowProps>, any> {
  static displayName = 'TableRow'

  static className = 'ui-table__row'

  static create: ShorthandFactory<TableHeaderRowProps>

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
    const { items } = this.props

    return _.map(items, (item: TableHeaderCellProps, index: number) => {
      const cellProps = {}
      const overrideProps = handleVariablesOverrides(variables)
      return (
        <React.Fragment key={index}>
          {TableHeaderCell.create(item, { defaultProps: () => cellProps, overrideProps })}
        </React.Fragment>
      )
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

TableHeaderRow.create = createShorthandFactory({
  Component: TableHeaderRow,
  mappedArrayProp: 'items',
})

export default TableHeaderRow
