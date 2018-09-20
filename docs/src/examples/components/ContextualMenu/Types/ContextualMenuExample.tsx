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

const sub_items = [
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
      <Popup
        align="top"
        position="after"
        trigger={<p>gopal</p>}
        content={
          // 'jdfngkjdfbgkjdfdfjb'
          <Menu defaultActiveIndex={0} items={subb_items} pills vertical />
        }
      />
    ),
  },
]

const items = [
  {
    key: 'editorials',
    content: (
      <div>
        <Avatar src="public/images/avatar/small/matt.jpg" />
        Gopal Goel
      </div>
    ),
    onClick: () => {
      alert('hel')
    },
  },
  {
    key: 'review',
    content: (
      <div>
        <Icon svg name="umbrella" />
        Show in channel
      </div>
    ),
  },
  {
    key: 'events',
    content: (
      <Popup
        align="top"
        position="after"
        trigger={<p>gopal</p>}
        content={
          // 'jdfngkjdfbgkjdfdfjb'
          <Menu defaultActiveIndex={0} items={sub_items} pills vertical />
        }
      />
    ),
  },
  {
    key: 'events',
    content: (
      <Popup
        align="top"
        position="after"
        trigger={<p>gopal</p>}
        content={
          // 'jdfngkjdfbgkjdfdfjb'
          <Menu defaultActiveIndex={0} items={sub_items} pills vertical />
        }
      />
    ),
  },
]

const ContextualMenuExample = () => (
  <ContextualMenu>
    <Popup
      align="top"
      position="after"
      trigger={
        <Button
          icon={'arrow circle right'}
          styles={{ root: { padding: '5px 5px 18px 48px', height: '38px', minWidth: '64px' } }}
        />
      }
      content={<Menu defaultActiveIndex={0} items={items} pills vertical />}
    />
  </ContextualMenu>
)

export default ContextualMenuExample
