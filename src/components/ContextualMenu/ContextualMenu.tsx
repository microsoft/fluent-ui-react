import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Popup from '../Popup/Popup'
import Button from '../Button'
import Menu, { MenuItem } from '../Menu'
import Avatar from '../Avatar'

export interface IContextualMenuProps {
  as?: any
  className?: string
  children?: ReactChildren
  content?: ItemShorthand | ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

const menuItemStyle = {
  root: { padding: '0px', margin: '0px', borderRadius: '0%' },
  anchor: { padding: '0px', minHeight: '50px' },
}
const triggerStyle = {
  padding: '15px',
}

/**
 * A contextualMenu.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class ContextualMenu extends UIComponent<Extendable<IContextualMenuProps>, any> {
  public static displayName = 'ContextualMenu'

  public static className = 'ui-contextualMenu'

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

  public static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'menutree',
    'persondescription',
    'styles',
    'variables',
  ]

  public static defaultProps = {
    as: 'div',
  }

  public renderMenuPersonDetail = personDescription => {
    const { iconOnly, pills, pointing, type, underlined, vertical } = this.props
    const item = {
      key: 'personDescription',
      styles: menuItemStyle,
      content: (
        <div style={triggerStyle}>
          <Avatar src={personDescription.imageUrl} />
          <span style={{ padding: '10px' }}>{personDescription.description}</span>
        </div>
      ),
    }
    const index = 4
    return MenuItem.create(item, {
      defaultProps: {
        iconOnly,
        pills,
        pointing,
        type,
        underlined,
        vertical,
        index,
      },
      // overrideProps: this.handleItemOverrides,
    })
  }

  public processTree = (menuTree, callback) => {
    menuTree.forEach(item => {
      if (item.submenuitems === undefined) {
        item.content = item.title
        item.styles = { ...menuItemStyle, anchor: { padding: '15px', minHeight: '50px' } }
        item.onClick = callback
      }
      if (item.submenuitems !== undefined) {
        this.processTree(item.submenuitems, callback)
        console.log('one')
        item.content = (
          <Popup
            align="top"
            position="after"
            trigger={<div style={{ padding: '15px' }}>{item.title}</div>}
            content={
              <Menu
                defaultActiveIndex={-1}
                items={item.submenuitems}
                pills
                vertical
                type="primary"
              />
            }
          />
        )
        item.styles = { ...menuItemStyle }
      }
    })
  }

  public renderMenuTree = (menutree, callback) => {
    this.processTree(menutree, callback)
    return <Menu defaultActiveIndex={-1} items={menutree} pills vertical type="primary" />
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { menutree, persondescription, callback } = this.props
    // console.log(menutree)
    return (
      <ElementType className={classes.root} {...rest}>
        {this.renderMenuPersonDetail(persondescription)}
        {this.renderMenuTree(menutree, callback)}
      </ElementType>
    )
  }
}

export default ContextualMenu
