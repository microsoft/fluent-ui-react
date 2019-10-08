import * as React from 'react'

import { UIComponent } from '../../lib'
import { withSafeTypeForAs } from '../../types'
import ToolbarItem from './ToolbarItem'

export interface ToolbarOverflowMenuProps {
  // getOverflowItems: any
  items: any
  onOpen: any
  menuOpen: boolean
}

class ToolbarOverflowMenu extends UIComponent<ToolbarOverflowMenuProps, any> {
  state = {
    menuItems: [],
    menuOpen: false,
  }

  componentDidMount() {}

  onMenuOpenChange = (e, { menuOpen }) => {
    // this.setState({
    //   menuOpen,
    //   menuItems: menuOpen ? this.props.getOverflowItems() : [],
    // })
    this.props.onOpen({ open: menuOpen })
  }

  renderComponent({ ElementType, unhandledProps }) {
    // return (
    //   <ToolbarCustomItem focusable content={<Text content="Wide overflow menu" styles={{whiteSpace :'nowrap'}} />} />
    // )
    // design={{position: 'absolute', top: 0, right: 0}} menu={this.state.menuItems} menuOpen={this.state.menuOpen}
    return (
      <ToolbarItem
        wrapper={{ styles: { position: 'absolute' /* , visibility: 'hidden' */ } }}
        icon="more"
        onMenuOpenChange={this.onMenuOpenChange}
        menu={this.props.items}
        menuOpen={this.props.menuOpen}
      />
    )
  }
}

export default withSafeTypeForAs<typeof ToolbarOverflowMenu, ToolbarOverflowMenuProps>(
  ToolbarOverflowMenu,
)
