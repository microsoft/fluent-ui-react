import * as React from 'react'
import { Menu, tabBehavior, tabListBehavior } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials', accessibility: tabBehavior },
  { key: 'review', content: 'Reviews', accessibility: tabBehavior },
  { key: 'events', content: 'Upcoming Events', accessibility: tabBehavior },
]

class MenuExampleTabShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        underlined
        primary
        accessibility={tabListBehavior}
        aria-label="Today's events"
      />
    )
  }
}

export default MenuExampleTabShorthand
