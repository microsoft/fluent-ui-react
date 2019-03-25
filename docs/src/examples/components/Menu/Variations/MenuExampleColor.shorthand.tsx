import * as React from 'react'
import { Menu, Flex, Provider } from '@stardust-ui/react'
const items = [
  {
    key: 'editorials',
    content: 'Editorials',
  },
  {
    key: 'review',
    content: 'Reviews',
  },
  {
    key: 'events',
    content: 'Upcoming Events',
  },
]

const MenuExampleColor = () => (
  <Provider.Consumer
    render={theme => (
      <Flex column gap="gap.medium">
        {Object.keys(theme.siteVariables.colorScheme).map(color => (
          <Menu vertical key={color} defaultActiveIndex={0} items={items} color={color} />
        ))}
      </Flex>
    )}
  />
)

export default MenuExampleColor
