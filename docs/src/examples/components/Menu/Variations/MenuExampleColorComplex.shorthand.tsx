import * as React from 'react'
import * as _ from 'lodash'
import { Menu, ProviderConsumer } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleColorComplex = () => (
  <ProviderConsumer
    render={({ siteVariables: { colorScheme } }) => {
      const colors = _.keys(colorScheme)

      return (
        <Menu
          defaultActiveIndex={0}
          underlined
          color={{ foreground: colors[3], background: colors[1], border: colors[0] }}
          items={items}
        />
      )
    }}
  />
)

export default MenuExampleColorComplex
