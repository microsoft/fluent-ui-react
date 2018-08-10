import React from 'react'
import { Menu, ToolbarBehavior, Button } from '@stardust-ui/react'

const items = [
  { key: 'cloud', content: <Button circular icon="cloud" /> },
  { key: 'clock', content: <Button circular icon="clock" /> },
  { key: 'book', content: <Button circular icon="book" /> },
]

class MenuExampleToolbarShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        shape="underlined"
        type="primary"
        accessibility={ToolbarBehavior}
        aria-label={`Compose Editor`}
      />
    )
  }
}

export default MenuExampleToolbarShorthand
