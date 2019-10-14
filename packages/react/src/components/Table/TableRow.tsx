import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import { UIComponent, RenderResultConfig, UIComponentProps, commonPropTypes } from '../../lib'
import { ShorthandValue, WithAsProp } from '../../types'
// import { Accessibility, tableRowBehavior, tableRowHeaderBehavior } from '@stardust-ui/accessibility'
import { Accessibility, tableRowBehavior } from '@stardust-ui/accessibility'

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tableRowBehavior
   * @available tableRowBehavior
   * */
  accessibility?: Accessibility

  // items?: ShorthandValue[]
  items?: ShorthandValue<any>

  headerIndex?: number

  focusedIndex?: number
  focusable?: boolean
  rowIndex?: number
  onClick?: (e, props) => void
  rowHeaderName?: string
}

/**
 * A TableRow is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableRow extends UIComponent<WithAsProp<TableRowProps>, any> {
  static displayName = 'TableRow'

  static className = 'ui-TableRow'

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
    headerIndex: PropTypes.number,
    focusedIndex: PropTypes.number,
    focusable: PropTypes.bool,
    onClick: PropTypes.func,
    rowIndex: PropTypes.number,
    rowHeaderName: PropTypes.string,
  }

  static defaultProps = {
    // as: 'tr',
    as: 'div',
    accessibility: tableRowBehavior as Accessibility,
    styles: { display: 'table-row' },
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event, null)
    },
  }

  handleClick = (e, props: TableCellProps) => {
    const data = {
      cellIndex: props && props.cellIndex,
      rowIndex: this.props.rowIndex,
      ...this.props,
      ...props,
    }
    _.invoke(this.props, 'onClick', e, data)
  }

  renderCells() {
    // const { items, headerIndex, focusedIndex } = this.props
    const { items, focusedIndex } = this.props

    return _.map(items, (item: TableCellProps, index: number) => {
      const cellProps = {
        ...item,
        focused: index === focusedIndex,
        focusable: this.props.focusable,
        onClick: this.handleClick,
        cellIndex: index,
      }
      // const headerProps = {
      //   ...cellProps,
      //   // as: 'th',
      //   accessibility: tableRowHeaderBehavior,
      // } as TableCellProps

      // if (headerIndex && index === headerIndex) {
      //   return <TableCell {...headerProps} />
      // }
      return <TableCell {...cellProps} />
    })
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...unhandledProps}
      >
        {this.renderCells()}
      </ElementType>
    )
  }
}

export default TableRow
