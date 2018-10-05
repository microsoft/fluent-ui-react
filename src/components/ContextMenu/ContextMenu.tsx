import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import List from '../List'

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

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { items, onItemClick } = this.props
    return (
      <ElementType className={classes.root} {...rest}>
        <List items={items} selection onClick={onItemClick} />
      </ElementType>
    )
  }
}

export default ContextMenu
