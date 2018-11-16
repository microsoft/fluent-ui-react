import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable } from '../../../types/utils'
import Menu, { MenuItem } from '../Menu'
// import List, { ListItem } from '../List'
// import Popup from '../Popup'
export interface IContextMenuProps {
  as?: any
  className?: string
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A contextMenu.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class ContextMenu extends UIComponent<Extendable<IContextMenuProps>, any> {
  static displayName = 'ContextMenu'

  static className = 'ui-contextmenu'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** The tree of menu containing submenus and it's submenus and so on. */
    items: PropTypes.arrayOf(PropTypes.object),

    /** Function passed which needs to be invoked when the menuitem has no submenu. */
    onItemClick: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    return (
      <ElementType className={classes.root} {...rest}>
        {this.renderItems()}
      </ElementType>
    )
  }

  renderItems = () => {
    const { items } = this.props
    return (
      <Menu vertical>
        {_.map(items, (item, index) =>
          MenuItem.create(item, {
            defaultProps: {
              index,
              styles: {
                color: 'rgba(37,36,36,0.75)',
                fontFamily: 'Segoe UI',
                ...(item.divider && {
                  borderBottom: '2px solid #F3F2F1',
                }),
              },
            },
          }),
        )}
      </Menu>
    )
  }
}

export default ContextMenu
