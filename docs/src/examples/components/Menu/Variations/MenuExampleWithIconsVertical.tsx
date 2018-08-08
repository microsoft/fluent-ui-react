import React from 'react'
import { Menu, Icon } from '@stardust-ui/react'

class MenuExampleWithIconsVertical extends React.Component {
  state = { activeItem: 'a' }

  handleItemClick = activeItem => () => {
    this.setState({ activeItem })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item vertical active={activeItem === 'a'} onClick={this.handleItemClick('a')}>
          <Icon name="home" xSpacing="after" />
          Home
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'b'} onClick={this.handleItemClick('b')}>
          <Icon name="users" xSpacing="after" />
          Users
        </Menu.Item>
        <Menu.Item vertical active={activeItem === 'c'} onClick={this.handleItemClick('c')}>
          <Icon name="search" xSpacing="none" />
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuExampleWithIconsVertical
