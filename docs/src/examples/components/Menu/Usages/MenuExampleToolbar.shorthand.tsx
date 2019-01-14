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
