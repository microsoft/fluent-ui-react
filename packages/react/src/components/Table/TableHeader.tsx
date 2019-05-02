import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import { UIComponent, RenderResultConfig, UIComponentProps, commonPropTypes } from '../../lib'
import { ReactProps, ShorthandValue } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface TableHeaderProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * @available TableHeaderBehavior
   * */
  accessibility?: Accessibility

  items?: ShorthandValue[]
}

/**
 * A TableHeader is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableHeader extends UIComponent<ReactProps<TableHeaderProps>, any> {
  public static displayName = 'TableHeader'

  public static className = 'ui-TableHeader'

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
  }

  public static defaultProps: TableHeaderProps = {
    as: 'thead',
    accessibility: defaultBehavior,
  }

  public renderHeaders() {
    const { items } = this.props

    return _.map(items, (item: TableCellProps) => {
      return <TableCell as="th" scope="col" {...item} />
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
        <tr>{this.renderHeaders()}</tr>
      </ElementType>
    )
  }
}

export default TableHeader
