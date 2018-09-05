import React from 'react'
import { Menu, TabBehavior, TabListBehavior } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials', accessibility: TabBehavior },
  { key: 'review', content: 'Reviews', accessibility: TabBehavior },
  { key: 'events', content: 'Upcoming Events', accessibility: TabBehavior },
]

class MenuExampleTabShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        underlined
        type="primary"
        accessibility={TabListBehavior}
        aria-label="Today's events"
      />
    )
  }
}

export default MenuExampleTabShorthand
