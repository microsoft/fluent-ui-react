import React from 'react'
import _ from 'lodash'
import { Menu, MenuItem, ToolbarBehavior, Icon, ToolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  { key: 'cloud', content: <Icon circular name="cloud" size="small" xSpacing="none" /> },
  { key: 'clock', content: <Icon circular name="clock" size="small" xSpacing="none" /> },
  { key: 'book', content: <Icon circular name="book" size="small" xSpacing="none" /> },
]

class MenuExampleToolbar extends React.Component {
  state = { activeIndex: 0 }

  handleItemClick = activeIndex => () => {
    this.setState({ activeIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Menu defaultActiveIndex={0} shape="underlined" accessibility={ToolbarBehavior}>
        {_.times(3, i => {
          return (
            <MenuItem
              key={items[i].key}
              content={items[i].content}
              shape="underlined"
              active={activeIndex === i}
              onClick={this.handleItemClick(i)}
              aria-label="Compose Editor"
              accessibility={ToolbarButtonBehavior}
            />
          )
        })}
      </Menu>
    )
  }
}

export default MenuExampleToolbar
