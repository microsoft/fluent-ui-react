import * as React from 'react'
import { Menu, Provider } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExamplePrimary = () => (
  <Provider.Consumer
    render={theme =>
      Object.keys(theme.siteVariables.colorScheme).map(color => (
        <Menu
          // variables={{
          //   // flat
          //   backgroundColor: 'red',
          //   backgroundColorHover: 'blue',
          //   verticalBackgroundColor: 'green',
          //   verticalBackgroundColorHover: 'orange',
          //   verticalItemBackgroundColor: 'red',
          //   verticalItemBackgroundColorHover: 'black',
          // }}
          vertical
          key={color}
          defaultActiveIndex={0}
          items={items}
          color={color}
        />
      ))
    }
  />
)

export default MenuExamplePrimary
