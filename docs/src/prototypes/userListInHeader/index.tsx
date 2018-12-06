import React from 'react'
import {
  List,
  Status,
  Menu,
  toolbarBehavior,
  toolbarButtonBehavior,
  Divider,
} from '@stardust-ui/react'
const s = { float: 'left' }
const itemsMenuToolbar = [
  {
    key: 'irving',
    content: 'Irving',
    accessibility: toolbarButtonBehavior,
    role: 'button',
  },
  {
    key: 'skyler',
    content: 'Skyler',
    role: 'button',
    accessibility: toolbarButtonBehavior,
  },
  {
    key: 'dante',
    content: 'Dante',
    role: 'button',
    accessibility: toolbarButtonBehavior,
  },
]

const itemsList = [
  {
    key: 'irving',
    media: <Status state="success" />,
    header: 'Irving Kuhic,',
    styles: s,
  },
  {
    key: 'skyler',
    media: <Status state="success" />,
    header: 'Skyler Parks,',
    styles: s,
  },
  {
    key: 'dante',
    media: <Status state="success" />,
    header: 'Dante Schneider',
    styles: s,
  },
]

// const ListExampleSelection = ({ knobs }) => <List selection={true} items={items}/>

// const MenuExamplePrimary = () => <Menu accessibility={toolbarBehavior} defaultActiveIndex={0} items={itemsMenu} primary />
// const MenuExamplePrimary2 = () => <Menu defaultActiveIndex={0} items={itemsMenu} primary />
// const ListExampleSelection = ({ knobs }) => <List items={itemsList}/>

export default () => (
  <div>
    <div>
      <button>Set focus here </button>
    </div>
    <br />
    <div>
      <List items={itemsList} />
    </div>
    <br />
    <div>
      <Divider tabIndex="0" />
    </div>
    <br />
    <div>
      <Menu
        accessibility={toolbarBehavior}
        defaultActiveIndex={0}
        items={itemsMenuToolbar}
        primary
      />
    </div>
  </div>
)
