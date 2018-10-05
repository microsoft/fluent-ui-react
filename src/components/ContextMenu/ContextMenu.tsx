import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import List, { ListItem } from '../List'
import { PopupWithSubmenu } from './PopupWithSubmenu'

export interface IContextMenuProps {
  as?: any
  className?: string
  children?: ReactChildren
  content?: ItemShorthand | ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A contextualMenu.
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

    /** Function passed which needs to be invoked when menuitem has no submenu */
    onItemClick: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      subMenuOpen: false,
      menuItemKey: '',
    }
  }

  renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    return (
      <ElementType className={classes.root} {...rest}>
        {this.renderItems()}
      </ElementType>
    )
  }

  renderItems = () => {
    const { items, onItemClick } = this.props
    const itemProps = _.pick(this.props, List.itemProps)
    itemProps.selection = true
    itemProps.onClick = onItemClick
    const children = _.map(items, item => {
      if (item.menu !== undefined) {
        return <PopupWithSubmenu item={item} items={item.menu.items} onItemClick={onItemClick} />
      }
      return ListItem.create(item, { defaultProps: itemProps })
    })
    return <List selection={true}>{children}</List>
  }

  // processItems = () => {
  //   const { items } = this.props
  //   if (items !== undefined) {
  //     items.map(item => {
  //       if (item.menu) {
  //         item.onClick = () => {
  //           this.handleClick(item)
  //         }
  //         // item.content = <PopupWithSubmenu items={item.menu.items} item={}/>
  //       }
  //     })
  //   }
  // }

  // handleClick = item => {
  //   this.setState(prevState => {
  //     if (prevState.subMenuOpen === false || prevState.menuItemKey !== item.menu.items) {
  //       return {
  //         subMenuOpen: true,
  //         menuItemKey: item.menu.items,
  //       }
  //     }
  //     return {
  //       subMenuOpen: !prevState.subMenuOpen,
  //       menuItemKey: item.menu.items,
  //     }
  //   })
  // }
}

export default ContextMenu
