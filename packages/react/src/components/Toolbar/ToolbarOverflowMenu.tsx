import * as React from 'react'

import { UIComponent } from '../../lib'
import { withSafeTypeForAs } from '../../types'
import ToolbarItem from './ToolbarItem'

export interface ToolbarOverflowMenuProps {}

class ToolbarOverflowMenu extends UIComponent<ToolbarOverflowMenuProps, any> {
  defaultProps: {
    as: ToolbarItem
  }

  state = {
    menuItems: [],
    menuOpen: false,
  }

  componentDidMount() {}

  onMenuOpenChange = (e, { menuOpen }) => {
    this.setState({
      menuOpen,
      menuItems: menuOpen ? this.props.getOverflowItems() : [],
    })
  }

  renderComponent({ ElementType, unhandledProps }) {
    // return (
    //   <ToolbarCustomItem focusable content={<Text content="Wide overflow menu" styles={{whiteSpace :'nowrap'}} />} />
    // )
    // design={{position: 'absolute', top: 0, right: 0}} menu={this.state.menuItems} menuOpen={this.state.menuOpen}
    return (
      <ToolbarItem
        {...unhandledProps}
        onMenuOpenChange={this.onMenuOpenChange}
        menu={this.state.menuItems}
        menuOpen={this.state.menuOpen}
      />
    )
  }
}

export default withSafeTypeForAs<typeof ToolbarOverflowMenu, ToolbarOverflowMenuProps>(
  ToolbarOverflowMenu,
)
