import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import { UIComponent, RenderResultConfig, UIComponentProps, commonPropTypes } from '../../lib'
import { ReactProps, ShorthandValue } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { tableRowBehavior, tableRowHeaderBehavior } from '../../lib/accessibility'

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tableRowBehavior
   * @available TableRowBehavior
   * */
  accessibility?: Accessibility

  items?: ShorthandValue[]

  headerIndex?: number

  focusedIndex?: number
  focusable?: boolean
  rowIndex?: number
  onFocus?: (e, props) => void
}

/**
 * A TableRow is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableRow extends UIComponent<ReactProps<TableRowProps>, any> {
  public static displayName = 'TableRow'

  public static className = 'ui-TableRow'

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
    items: customPropTypes.collectionShorthand,
    headerIndex: PropTypes.number,
    focusedIndex: PropTypes.number,
    focusable: PropTypes.bool,
    onFocus: PropTypes.func,
    rowIndex: PropTypes.number,
  }

  public static defaultProps: TableRowProps = {
    as: 'tr',
    accessibility: tableRowBehavior,
  }

  renderCells() {
    const { items, headerIndex, focusedIndex } = this.props

    return _.map(items, (item: TableCellProps, index) => {
      const cellProps = {
        ...item,
        focused: index === focusedIndex,
        focusable: this.props.focusable,
        onFocus: (e, props: TableCellProps) => {
          const data = {
            cellIndex: props.cellIndex,
            rowIndex: this.props.rowIndex,
            ...this.props,
            ...props,
          }
          _.invoke(this.props, 'onFocus', e, data)
        },
        cellIndex: index,
      }
      const headerProps = {
        ...cellProps,
        as: 'th',
        accessibility: tableRowHeaderBehavior,
      } as TableCellProps

      if (headerIndex && index === headerIndex) {
        return <TableCell {...headerProps} />
      }
      return <TableCell {...cellProps} />
    })
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {this.renderCells()}
      </ElementType>
    )
  }
}

export default TableRow
