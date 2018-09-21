import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Popup from '../Popup/Popup'
import Button from '../Button'
import Menu from '../Menu'
import { Avatar, Icon } from '@stardust-ui/react'

export interface IContextualMenuProps {
  as?: any
  className?: string
  children?: ReactChildren
  content?: ItemShorthand | ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
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

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = ['as', 'children', 'className', 'content', 'styles', 'variables']

  public static defaultProps = {
    as: 'div',
  }

  public renderItems = items => {
    const menuItemStyle = {
      root: { padding: '0px', margin: '0px', minHeight: '50px', borderRadius: '0%' },
      anchor: { padding: '0px' },
    }
    const triggerStyle = {
      padding: '15px',
    }
    return items.map(item => {
      item.styles = menuItemStyle
    })
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { children, content } = this.props
    const menuItemStyle = {
      root: { padding: '0px', margin: '0px', borderRadius: '0%' },
      anchor: { padding: '0px', minHeight: '50px' },
    }
    const triggerStyle = {
      padding: '15px',
    }
    const sub_sub_items = [
      {
        key: 'editorials',
        styles: { ...menuItemStyle, anchor: { padding: '15px', minHeight: '50px' } },
        content: 'Editorials',
      },
      {
        key: 'review',
        styles: { ...menuItemStyle, anchor: { padding: '15px' } },
        content: 'Reviews',
        onClick: () => {
          alert('hel')
        },
      },
      {
        key: 'events',
        styles: menuItemStyle,
        content: (
          <Popup
            align="top"
            position="after"
            trigger={<div style={triggerStyle}>Events</div>}
            content={'goapl'}
          />
        ),
      },
    ]
    const sub_items = [
      {
        key: 'editorials',
        styles: { ...menuItemStyle, anchor: { padding: '15px', minHeight: '50px' } },
        content: 'Editorials',
      },
      {
        key: 'review',
        styles: { ...menuItemStyle, anchor: { padding: '15px' } },
        content: 'Reviews',
        onClick: () => {
          alert('hel')
        },
      },
      {
        key: 'events',
        styles: menuItemStyle,
        content: (
          <Popup
            align="top"
            position="after"
            trigger={<div style={triggerStyle}>Events</div>}
            content={
              <Menu defaultActiveIndex={-1} items={sub_sub_items} pills vertical type="primary" />
            }
          />
        ),
      },
    ]
    const items = [
      {
        key: 'editorials',
        styles: menuItemStyle,
        content: (
          <div style={triggerStyle}>
            <Avatar src="public/images/avatar/small/matt.jpg" />
            <span style={{ padding: '10px' }}>Gopal Goel</span>
          </div>
        ),
      },
      {
        key: 'review',
        icon: 'search',
        content: 'Click for callback',
        styles: { ...menuItemStyle, anchor: { padding: '15px' } },
        onClick: () => {
          alert('Callback clicked...')
        },
      },
      {
        key: 'events',
        styles: menuItemStyle,
        content: (
          <Popup
            align="top"
            position="after"
            trigger={<div style={triggerStyle}>Submenu 1</div>}
            content={
              <Menu defaultActiveIndex={-1} items={sub_items} pills vertical type="primary" />
            }
          />
        ),
      },
      {
        key: 'events',
        styles: menuItemStyle,
        content: (
          <Popup
            align="top"
            position="after"
            trigger={<div style={triggerStyle}>Submenu 2</div>}
            content={
              <Menu defaultActiveIndex={-1} items={sub_items} pills vertical type="primary" />
            }
          />
        ),
      },
    ]
    return (
      <ElementType className={classes.root} {...rest}>
        {/* {childrenExist(children) ? children : content} */}
        {/* <Popup
          align="top"
          position="after"
          trigger={
            <Button
              content="Click to open menu"
              icon="arrow right"
              iconPosition="after"
              styles={{ root: { padding: '5px 5px', height: '38px', minWidth: '64px' } }}
            />
          }
          content={<Menu defaultActiveIndex={0} items={items} pills vertical />}
        /> */}
        <Menu defaultActiveIndex={-1} items={items} pills vertical type="primary" />
      </ElementType>
    )
  }
}

export default ContextualMenu
