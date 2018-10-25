import * as React from 'react'
import { Menu, Provider } from '@stardust-ui/react'
import { navbarMenuItemStyles } from './styles'

export default () => (
  <Provider
    theme={{
      componentStyles: {
        MenuItem: {
          anchor: navbarMenuItemStyles,
        },
      },
    }}
  >
    <>
      <Menu
        type="primary"
        items={['Past Events', 'Blog', 'Partners', 'Archive', 'Videos', 'Handbook', 'About Us']}
      />
    </>
  </Provider>
)
