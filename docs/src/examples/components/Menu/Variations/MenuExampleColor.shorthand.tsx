import React from 'react'
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

const MenuExamplePrimary = () => (
  <Provider.Consumer
    render={theme => (
      <Flex column gap="gap.medium">
        {Object.keys(theme.siteVariables.colorScheme).map(color => (
          <Menu // variables={{
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
        ))}
      </Flex>
    )}
  />
)

export default MenuExamplePrimary
