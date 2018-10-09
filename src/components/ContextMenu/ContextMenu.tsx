import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable } from '../../../types/utils'
import List, { ListItem } from '../List'
import Popup from '../Popup'
export interface IContextMenuProps {
  as?: any
  className?: string
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

  renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    return (
      <ElementType className={classes.root} {...rest}>
        {this.renderItems()}
      </ElementType>
    )
  }

  renderItems = () => {
    const { items, onItemClick } = this.props
    const children = _.map(items, item => {
      const itemProps = _.pick(this.props, List.itemProps)
      itemProps.selection = true
      if (item.menu !== undefined) {
        return (
          <Popup
            align="top"
            position="after"
            content={{
              content: <ContextMenu items={item.menu.items} onItemClick={onItemClick} />,
              styles: {
                padding: '0px',
              },
            }}
            // content={<ContextMenu items={item.menu.items} onItemClick={onItemClick} />}
          >
            {ListItem.create(item, { defaultProps: itemProps })}
          </Popup>
        )
      }
      itemProps.onClick = onItemClick
      return ListItem.create(item, { defaultProps: itemProps })
    })
    return <List selection={true}>{children}</List>
  }
}

export default ContextMenu
