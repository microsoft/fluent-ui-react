import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'cloud',
    icon: {
      name: 'cloud',
      circular: true,
      size: 'small',
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Cloud Tool',
  },
  {
    key: 'clock',
    icon: {
      name: 'clock',
      circular: true,
      size: 'small',
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Clock Tool',
  },
  {
    key: 'book',
    icon: {
      name: 'book',
      circular: true,
      size: 'small',
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Book Tool',
  },
  {
    key: 'book',
    icon: {
      name: 'book',
      circular: true,
      size: 'small',
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Book Tool',
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
        },
        {
          key: '3',
          content: 'item3',
          menu: { items: [{ key: '1', content: 'item3.1' }, { key: '2', content: 'item3.2' }] },
        },
      ],
    },
  },
]

class MenuExampleToolbarShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        accessibility={toolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarShorthand
