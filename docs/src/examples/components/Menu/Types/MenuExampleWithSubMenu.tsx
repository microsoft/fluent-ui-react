import * as React from 'react'
import { Menu } from '@stardust-ui/react'

class MenuExampleWithSubMenu extends React.Component {
  state = { activeItem: 'a' }

  handleItemClick = activeItem => () => {
    this.setState({ activeItem })
  }

  submenuStyle = {
    position: 'absolute',
    top: '100%',
    width: '100px',
    left: 0,
  }

  menuStyle = {
    width: '100px',
    position: 'relative',
  }

  render() {
    const { activeItem } = this.state

    const submenu1 = (
      <Menu vertical style={this.submenuStyle}>
        <Menu.Item vertical active={activeItem === 'e'} onClick={this.handleItemClick('e')}>
          New
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'f'} onClick={this.handleItemClick('f')}>
          Open
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'g'} onClick={this.handleItemClick('g')}>
          Edit
        </Menu.Item>
      </Menu>
    )

    const submenu2 = (
      <Menu vertical style={this.submenuStyle}>
        <Menu.Item vertical active={activeItem === 'h'} onClick={this.handleItemClick('h')}>
          Undo
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'i'} onClick={this.handleItemClick('i')}>
          Redo
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'j'} onClick={this.handleItemClick('j')}>
          Cut
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'k'} onClick={this.handleItemClick('k')}>
          Copy
        </Menu.Item>
      </Menu>
    )

    const submenu3 = (
      <Menu vertical style={this.submenuStyle}>
        <Menu.Item vertical active={activeItem === 'l'} onClick={this.handleItemClick('l')}>
          Font
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'm'} onClick={this.handleItemClick('m')}>
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
          style={this.menuStyle}
          tabIndex={0}
        >
          File<span aria-hidden="true"> ▾</span>
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'b'}
          onClick={this.handleItemClick('b')}
          submenu={submenu2}
          style={this.menuStyle}
        >
          Edit<span aria-hidden="true"> ▾</span>
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'c'}
          onClick={this.handleItemClick('c')}
          submenu={submenu3}
          style={this.menuStyle}
        >
          Format<span aria-hidden="true"> ▾</span>
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'd'}
          onClick={this.handleItemClick('c')}
          style={this.menuStyle}
        >
          Help
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuExampleWithSubMenu
