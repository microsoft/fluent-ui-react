import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import {
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  UIComponent,
  applyAccessibilityKeyHandlers,
  childrenExist,
} from '../../lib'
import { ComponentVariablesObject } from '../../themes/types'
import { mergeComponentVariables } from '../../lib/mergeThemes'
import TableRow, { TableRowProps } from './TableRow'
import TableCell from './TableCell'
import { WithAsProp, ShorthandCollection, ShorthandValue } from '../../types'
import { Accessibility, tableBehavior } from '@fluentui/accessibility'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'
import TableHeaderRow, { TableHeaderRowProps } from './TableHeaderRow'
import { TableHeaderCellProps } from './TableHeaderCell'

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
  header?: ShorthandValue<TableHeaderRowProps>

  /** The rows of the Table with a space-separated list of values.
   */
  rows?: ShorthandCollection<TableRowProps>

  /**
   * Render table in compact mode
   */
  compact?: boolean
}

const handleVariablesOverrides = variables => predefinedProps => ({
  variables: mergeComponentVariables(variables, predefinedProps.variables),
})

type TableState = {
  selfWidth?: number
}

/**
 * A Table is used to display data in tabular layout
 */
class Table extends UIComponent<WithAsProp<TableProps>, TableState> {
  static displayName = 'Table'
  static className = 'ui-table'

  static Cell = TableCell
  static Row = TableRow

  static slotClassNames: TableSlotClassNames = {
    header: `${Table.className}__header`,
  }

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
    accessibility: tableBehavior as Accessibility,
  }

  readonly state: TableState = {}

  renderRows(accessibility: ReactAccessibilityBehavior, variables: ComponentVariablesObject) {
    const { rows, compact } = this.props

    return _.map(rows, (row: TableRowProps, index: number) => {
      const props = {
        role: accessibility.attributes.row.role,
        compact,
      } as TableRowProps

      const overrideProps = handleVariablesOverrides(variables)
      return TableRow.create(row, { defaultProps: () => props, overrideProps })
    })
  }

  renderHeader(accessibility: ReactAccessibilityBehavior, variables: ComponentVariablesObject) {
    const { header, compact } = this.props
    if (!header) {
      return null
    }

    const headerRowProps = {
      role: accessibility.attributes.row.role,
      compact,
      className: Table.slotClassNames.header,
    } as TableHeaderRowProps

    const overrideProps = handleVariablesOverrides(variables)
    return TableHeaderRow.create(header, {
      defaultProps: () => headerRowProps,
      overrideProps,
    })
  }

  selfNode = React.createRef<HTMLElement>()

  handleWindowResize: () => void | undefined

  componentDidMount() {
    if (Array.isArray(this.props.header)) {
      this.handleWindowResize = () =>
        this.setState({ selfWidth: this.selfNode.current.clientWidth })

      // eslint-disable-next-line no-undef
      window.addEventListener('resize', this.handleWindowResize)

      // Capture the initial size
      this.setState({ selfWidth: this.selfNode.current.clientWidth })
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    window.removeEventListener('resize', this.handleWindowResize)
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

    let style = ''
    if (Array.isArray(this.props.header)) {
      const columns = this.props.header as TableHeaderCellProps[]
      const sortedColumns = [...columns].sort((a, b) => b.priority - a.priority)
      let visibleColumns = []
      let count = 1
      do {
        const candidateColumns = sortedColumns.slice(0, count)
        const ratio = candidateColumns.reduce((a, c) => a + c.flex, 0)
        const allFit = candidateColumns.every(
          c => c.minWidth < this.state.selfWidth * (c.flex / ratio),
        )

        if (!allFit) {
          break
        }

        visibleColumns = candidateColumns
        count++
      } while (count <= sortedColumns.length)

      // TODO: Add support for pulling this from the `TableHeaderRow` items as well
      style += columns
        .map(
          (c, i) =>
            `.ui-table__cell:nth-child(${i + 1}) { flex: ${c.flex};${
              visibleColumns.indexOf(c) === -1 ? ' display: none;' : ''
            } }`,
        )
        .join('\n')
      // style += `\n/* ${this.state.selfWidth} */`
    }

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        ref={this.selfNode}
      >
        {style && <style scoped>{style}</style>}
        {hasChildren && children}
        {/* <thead> */}
        {!hasChildren && this.renderHeader(accessibility, variables)}
        {/* </thead> */}
        {/* <tbody> */}
        {!hasChildren && this.renderRows(accessibility, variables)}
        {/* </tbody> */}
      </ElementType>
    )
  }
}

export default Table
