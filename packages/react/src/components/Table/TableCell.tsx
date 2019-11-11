import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  ShorthandFactory,
  createShorthandFactory,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import Box, { BoxProps } from '../Box/Box'
import { WithAsProp, ShorthandValue } from '../../types'
import { Accessibility, tableCellBehavior } from '@stardust-ui/accessibility'

export interface TableCellProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility

  /**
   * Truncate cell's content
   */
  truncateContent?: boolean
}

export interface TableCellSlotClassNames {
  content: string
}

/**
 * Component represents a table cell
 *
 */
class TableCell extends UIComponent<WithAsProp<any>, any> {
  static displayName = 'TableCell'

  static className = 'ui-table__cell'

  static slotClassNames: TableCellSlotClassNames = {
    content: `${TableCell.className}__content`,
  }

  static create: ShorthandFactory<TableCellProps>

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
    truncateContent: PropTypes.bool,
  }

  static defaultProps = {
    as: 'div',
    accessibility: tableCellBehavior as Accessibility,
  }

  renderComponent({
    accessibility,
    ElementType,
    styles,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { children, content } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {hasChildren
          ? children
          : Box.create(!hasChildren && content, {
              defaultProps: () => ({ as: 'div', styles: styles.content }),
            })}
      </ElementType>
    )
  }
}

TableCell.create = createShorthandFactory({ Component: TableCell, mappedProp: 'content' })

export default TableCell
