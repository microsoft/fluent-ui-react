import React from 'react'
import * as _ from 'lodash'
import { Menu, MenuItem } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuExampleVertical extends React.Component {
  state = { activeIndex: 0 }

  handleItemClick = activeIndex => () => {
    this.setState({ activeIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Menu vertical>
        {_.times(3, i => {
          return (
            <MenuItem
              key={items[i].key}
              onClick={this.handleItemClick(i)}
              content={items[i].content}
              vertical
              active={activeIndex === i}
            />
          )
        })}
      </Menu>
    )
  }
}

export default MenuExampleVertical
