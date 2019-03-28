import * as React from 'react'
import { Menu } from '@stardust-ui/react'

class MenuWithSubmenuControlledExample extends React.Component {
  state = { editorialsMenuOpen: false }

  handleMenuOpenChange = (e, { menuOpen }) => {
    this.setState({ editorialsMenuOpen: menuOpen })
  }

  renderItems = () => {
    return [
      {
        key: 'editorials',
        content: 'Editorials',
        menuOpen: this.state.editorialsMenuOpen,
        onMenuOpenChange: this.handleMenuOpenChange,
        menu: {
          items: [
            { key: '1', content: 'item1' },
            {
              key: '2',
              content: 'item2',
              menu: [{ key: '1', content: 'item2.1' }, { key: '2', content: 'item2.2' }],
            },
            {
              key: '3',
              content: 'item3',
              menu: [{ key: '1', content: 'item3.1' }, { key: '2', content: 'item3.2' }],
            },
          ],
        },
      },
      { key: 'events', content: 'Upcoming Events' },
    ]
  }

  render() {
    return (
      <>
        <span>{`Editorials menu item requested to change its submenu open state to "${
          this.state.editorialsMenuOpen
        }".`}</span>
        <Menu defaultActiveIndex={0} items={this.renderItems()} />
      </>
    )
  }
}

export default MenuWithSubmenuControlledExample
