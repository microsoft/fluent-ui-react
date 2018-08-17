import * as React from 'react'
import { Menu } from '@stardust-ui/react'

// class MenuExampleWithSubMenu extends React.Component {
//   state = { activeItem: 'a' }

//   handleItemClick = activeItem => () => {
//     this.setState({ activeItem })
//   }

//   submenuStyle = {
//     position: 'absolute',
//     top: '100%',
//     width: '100px',
//     left: 0,
//   }

//   menuStyle = {
//     width: '100px',
//     position: 'relative',
//   }

//   render() {
//     const { activeItem } = this.state

//     const submenu1 = (
//       <Menu vertical style={this.submenuStyle}>
//         <Menu.Item vertical active={activeItem === 'e'} onClick={this.handleItemClick('e')}>
//           New
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'f'} onClick={this.handleItemClick('f')}>
//           Open
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'g'} onClick={this.handleItemClick('g')}>
//           Edit
//         </Menu.Item>
//       </Menu>
//     )

//     const submenu2 = (
//       <Menu vertical style={this.submenuStyle}>
//         <Menu.Item vertical active={activeItem === 'h'} onClick={this.handleItemClick('h')}>
//           Undo
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'i'} onClick={this.handleItemClick('i')}>
//           Redo
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'j'} onClick={this.handleItemClick('j')}>
//           Cut
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'k'} onClick={this.handleItemClick('k')}>
//           Copy
//         </Menu.Item>
//       </Menu>
//     )

//     const submenu3 = (
//       <Menu vertical style={this.submenuStyle}>
//         <Menu.Item vertical active={activeItem === 'l'} onClick={this.handleItemClick('l')}>
//           Font
//         </Menu.Item>
//         <Menu.Item vertical active={activeItem === 'm'} onClick={this.handleItemClick('m')}>
//           Text
//         </Menu.Item>
//       </Menu>
//     )

//     return (
//       <Menu>
//         <Menu.Item
//           active={activeItem === 'a'}
//           onClick={this.handleItemClick('a')}
//           submenu={submenu1}
//           style={this.menuStyle}
//           tabIndex={0}
//         >
//           File<span aria-hidden="true"> ▾</span>
//         </Menu.Item>
//         <Menu.Item
//           active={activeItem === 'b'}
//           onClick={this.handleItemClick('b')}
//           submenu={submenu2}
//           style={this.menuStyle}
//         >
//           Edit<span aria-hidden="true"> ▾</span>
//         </Menu.Item>
//         <Menu.Item
//           active={activeItem === 'c'}
//           onClick={this.handleItemClick('c')}
//           submenu={submenu3}
//           style={this.menuStyle}
//         >
//           Format<span aria-hidden="true"> ▾</span>
//         </Menu.Item>
//         <Menu.Item
//           active={activeItem === 'd'}
//           onClick={this.handleItemClick('c')}
//           style={this.menuStyle}
//         >
//           Help
//         </Menu.Item>
//       </Menu>
//     )
//   }
// }

// export default MenuExampleWithSubMenu

const submenuStyle = {
  position: 'absolute',
  top: '100%',
  width: '100px',
  left: 0,
}

const menuStyle = {
  width: '100px',
  position: 'relative',
}

const subMenuItems1 = [
  { key: 'a', content: 'New' },
  { key: 'b', content: 'Open' },
  { key: 'c', content: 'Edit' },
]

const subMenuItems2 = [
  { key: 'd', content: 'Undo' },
  { key: 'e', content: 'Redo' },
  { key: 'f', content: 'Cut' },
  { key: 'g', content: 'Cope' },
]

const subMenuItems3 = [{ key: 'h', content: 'Font' }, { key: 'i', content: 'Text' }]

const submenu1 = <Menu items={subMenuItems1} vertical style={submenuStyle} />

const submenu2 = <Menu items={subMenuItems2} vertical style={submenuStyle} />

const submenu3 = <Menu items={subMenuItems3} vertical style={submenuStyle} />

const items = [
  { key: 'file', content: <span>File ▾</span>, submenu: submenu1, style: menuStyle, tabIndex: 0 },
  { key: 'edit', content: <span>Edit ▾</span>, submenu: submenu2, style: menuStyle },
  { key: 'format', content: <span>Format ▾</span>, submenu: submenu3, style: menuStyle },
  { key: 'help', content: 'Help', style: menuStyle },
]

class MenuExampleWithSubMenu extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithSubMenu
