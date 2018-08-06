import React from 'react'
import * as _ from 'lodash'
import { Menu, MenuItem } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuExampleUnderlinedPrimary extends React.Component {
  state = { activeIndex: 0 }

  handleItemClick = activeIndex => () => {
    this.setState({ activeIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Menu defaultActiveIndex={0} shape="underlined" type="primary">
        {_.times(3, i => {
          return (
            <MenuItem
              key={items[i].key}
              content={items[i].content}
              shape="underlined"
              type="primary"
              active={activeIndex === i}
              onClick={this.handleItemClick(i)}
            />
          )
        })}
      </Menu>
    )
  }
}

export default MenuExampleUnderlinedPrimary
