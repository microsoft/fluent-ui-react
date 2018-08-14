import React from 'react'
import { Menu, ToolbarBehavior, Icon } from '@stardust-ui/react'

const items = [
  { key: 'cloud', content: <Icon circular xSpacing="none" size="small" name="cloud" /> },
  { key: 'clock', content: <Icon circular xSpacing="none" size="small" name="clock" /> },
  { key: 'book', content: <Icon circular xSpacing="none" size="small" name="book" /> },
]

class MenuExampleToolbarShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        shape="underlined"
        accessibility={ToolbarBehavior}
        aria-label={`Compose Editor`}
      />
    )
  }
}

export default MenuExampleToolbarShorthand
