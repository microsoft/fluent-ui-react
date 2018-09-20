import React from 'react'
import { ContextualMenu, Popup, Menu, Button, Avatar, Icon } from '@stardust-ui/react'

const subb_items = [
  {
    key: 'editorials',
    content: 'Editorials',
    onClick: () => {
      alert('hel')
    },
  },
  { key: 'review', content: 'Reviews' },
  {
    key: 'events',
    content: (
      <Popup align="top" position="after" trigger={<p>gopal</p>} content={'jdfngkjdfbgkjdfdfjb'} />
    ),
  },
]

const menuItemStyle = {
  root: { padding: '0px', margin: '0px', minHeight: '50px', borderRadius: '0%' },
  anchor: { padding: '0px' },
}

const triggerStyle = {
  padding: '15px',
}

const sub_items = [
  {
    key: 'editorials',
    styles: { ...menuItemStyle, anchor: { padding: '15px' } },
    content: 'Editorials',
    onClick: () => {
      alert('hel')
    },
  },
  { key: 'review', styles: { ...menuItemStyle, anchor: { padding: '15px' } }, content: 'Reviews' },
  {
    key: 'events',
    styles: menuItemStyle,
    content: (
      <Popup
        align="top"
        position="after"
        trigger={<div style={triggerStyle}>Events</div>}
        content={<Menu defaultActiveIndex={0} items={subb_items} pills vertical />}
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
    onClick: () => {
      alert('hel')
    },
  },
  {
    key: 'review',
    icon: 'search',
    content: 'Search in channel',
    styles: { ...menuItemStyle, anchor: { padding: '15px' } },
  },
  {
    key: 'events',
    styles: menuItemStyle,
    content: (
      <Popup
        align="top"
        position="after"
        trigger={<div style={triggerStyle}>Submenu 1</div>}
        content={<Menu defaultActiveIndex={0} items={sub_items} pills vertical />}
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
        content={<Menu defaultActiveIndex={0} items={sub_items} pills vertical />}
      />
    ),
  },
]

const ContextualMenuExample = () => (
  <ContextualMenu
    content={
      <Popup
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
      />
    }
  />
)

export default ContextualMenuExample
