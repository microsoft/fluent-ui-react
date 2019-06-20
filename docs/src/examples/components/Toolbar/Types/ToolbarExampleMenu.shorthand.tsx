import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <Toolbar
      items={[
        {
          key: 'more',
          icon: 'more',
          active: menuOpen,
          menu: {
            items: [
              { key: 'play', content: 'Play', icon: 'play' },
              { key: 'pause', content: 'Pause', icon: 'pause' },
              'Without icon',
            ],
            onItemClick: (e, { content }) => {
              console.log(`Click - ${content}`)
            },
          },
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenuOpen(menuOpen)
          },
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuShorthand
