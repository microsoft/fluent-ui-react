import React from 'react'
import _ from 'lodash'
import { Menu, MenuItem, ToolbarBehavior, Button } from '@stardust-ui/react'

const items = [
  { key: 'cloud', content: <Button circular icon="cloud" /> },
  { key: 'clock', content: <Button circular icon="clock" /> },
  { key: 'book', content: <Button circular icon="book" /> },
]

class MenuExampleToolbar extends React.Component {
  state = { activeIndex: 0 }

  handleItemClick = activeIndex => () => {
    this.setState({ activeIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Menu defaultActiveIndex={0} shape="pills" accessibility={ToolbarBehavior}>
        {_.times(3, i => {
          return (
            <MenuItem
              key={items[i].key}
              content={items[i].content}
              shape="pills"
              active={activeIndex === i}
              onClick={this.handleItemClick(i)}
              aria-label={`Compose Editor`}
            />
          )
        })}
      </Menu>
    )
  }
}

export default MenuExampleToolbar
