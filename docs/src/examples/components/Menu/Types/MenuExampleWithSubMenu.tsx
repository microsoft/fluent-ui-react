import React from 'react'
import { Menu } from '@stardust-ui/react'
import VerticalMenuItemBehavior from 'src/lib/accessibility/Behaviors/Menu/VerticalMenuItemBehavior'

class MenuExampleWithSubMenu extends React.Component {
  state = { activeItem: 'a' }

  handleItemClick = activeItem => () => {
    this.setState({ activeItem })
  }

  render() {
    const { activeItem } = this.state

    const submenu1 = (
      <Menu vertical>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'e'}
          onClick={this.handleItemClick('e')}
        >
          New
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'f'}
          onClick={this.handleItemClick('f')}
        >
          Open
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'g'}
          onClick={this.handleItemClick('g')}
        >
          Edit
        </Menu.Item>
      </Menu>
    )

    const submenu2 = (
      <Menu vertical>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'h'}
          onClick={this.handleItemClick('h')}
        >
          Undo
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'i'}
          onClick={this.handleItemClick('i')}
        >
          Redo
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'j'}
          onClick={this.handleItemClick('j')}
        >
          Cut
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'k'}
          onClick={this.handleItemClick('k')}
        >
          Copy
        </Menu.Item>
      </Menu>
    )

    const submenu3 = (
      <Menu vertical>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'l'}
          onClick={this.handleItemClick('l')}
        >
          Font
        </Menu.Item>
        <Menu.Item
          accessibility={VerticalMenuItemBehavior}
          active={activeItem === 'm'}
          onClick={this.handleItemClick('m')}
        >
          Text
        </Menu.Item>
      </Menu>
    )

    return (
      <Menu>
        <Menu.Item
          active={activeItem === 'a'}
          onClick={this.handleItemClick('a')}
          submenu={submenu1}
        >
          File
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'b'}
          onClick={this.handleItemClick('b')}
          submenu={submenu2}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'c'}
          onClick={this.handleItemClick('c')}
          submenu={submenu3}
        >
          Format
        </Menu.Item>
        <Menu.Item active={activeItem === 'd'} onClick={this.handleItemClick('c')}>
          Help
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuExampleWithSubMenu
