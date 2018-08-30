import React from 'react'
import { Menu, ToolbarBehavior, Icon, ToolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'cloud',
    icon: <Icon circular xSpacing="both" size="small" name="cloud" />,
    accessibility: ToolbarButtonBehavior,
    'aria-label': 'Cloud Tool',
  },
  {
    key: 'clock',
    icon: <Icon circular xSpacing="both" size="small" name="clock" />,
    accessibility: ToolbarButtonBehavior,
    'aria-label': 'Clock Tool',
  },
  {
    key: 'book',
    icon: <Icon circular xSpacing="both" size="small" name="book" />,
    accessibility: ToolbarButtonBehavior,
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
        accessibility={ToolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarShorthand
