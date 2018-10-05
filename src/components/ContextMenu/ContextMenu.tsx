import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Menu from '../Menu'
import Avatar from '../Avatar'
import Provider from '../Provider'
import Divider from '../Divider'
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
  public static displayName = 'ContextMenu'

  public static className = 'ui-contextmenu'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Function passed which needs to be invoked when menuitem has no submenu */
    callback: PropTypes.func,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.itemShorthand),
        customPropTypes.itemShorthand,
      ]),
    ]),

    /** The tree of menu containing submenus and it's submenus and so on. */
    menutree: PropTypes.arrayOf(PropTypes.object),

    /** An object containing imageUrl and the descrioption of the person*/
    persondescription: PropTypes.object,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
  }

  public processTree = (menuTree, callback) => {
    menuTree.forEach(item => {
      if (item.submenuitems === undefined) {
        if (item.iconName) item.icon = item.iconName
        if (item.persondescription !== undefined) {
          item.content = (
            <div>
              <div style={{ paddingLeft: '15px' }}>
                <Avatar image={item.persondescription.imageUrl} />
                <span style={{ padding: '10px' }}>{item.persondescription.description}</span>
              </div>
              <Divider variables={{ dividerPadding: 0 }} />
            </div>
          )
        } else {
          item.content = (
            <span>
              <span style={{ paddingLeft: '15px' }}>{item.title}</span>
              {item.divider ? <Divider variables={{ dividerPadding: 0 }} /> : null}
            </span>
          )
        }
        item.onClick = callback
      }
      if (item.submenuitems !== undefined) {
        // this.processTree(item.submenuitems, callback)
        item.content = <PopupWithSubmenu item={item} callback={callback} />
      }
    })
  }

  public renderMenuTree = (menutree, callback) => {
    if (menutree === undefined) {
      return undefined
    }
    this.processTree(menutree, callback)
    return (
      <Provider
        theme={{
          componentStyles: {
            MenuItem: {
              root: {
                padding: '0px',
                margin: '0px',
                borderRadius: '0px',
                minWidth: '200px',
                width: '100%',
              },
              anchor: { padding: '0px', height: '100%', width: '100%', lineHeight: '50px' },
            },
            Menu: {
              root: { width: '100%' },
            },
            Icon: {
              root: { margin: '15px', marginRight: '0px' },
            },
          },
        }}
      >
        <Menu defaultActiveIndex={-1} items={menutree} pills vertical type="primary" />
      </Provider>
    )
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { menutree, callback } = this.props
    return (
      <ElementType className={classes.root} {...rest}>
        {this.renderMenuTree(menutree, callback)}
      </ElementType>
    )
  }
}

export default ContextMenu
