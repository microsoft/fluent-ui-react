import * as React from 'react'
import * as _ from 'lodash'
import { Menu, Grid, Text } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const iconItems = [
  { key: 'home', content: 'Home', icon: 'home' },
  { key: 'users', content: 'Users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

const MenuExampleColor = ({
  knobs: {
    selectedItem: { name, value },
  },
}: {
  knobs: { selectedItem: { name: string; value: string } }
}) => (
  <Grid
    columns="repeat(2, auto)"
    styles={{ justifyContent: 'left', justifyItems: 'left', alignItems: 'center' }}
    variables={{ gridGap: '10px' }}
  >
    <Text content={`${name} DEFAULT MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} items={items} />
    <Text content={`${name} PILLS MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} pills items={items} />
    <Text content={`${name} POINTING MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} pointing items={items} />
    <Text content={`${name} VERTICAL POINTING MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} vertical pointing items={items} />
    <Text content={`${name} UNDERLINED MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} underlined items={items} />
    <Text content={`${name} ICON MENU:`} weight="bold" />
    <Menu defaultActiveIndex={0} color={value} items={iconItems} />
    <Text content={`${name} ICON ONLY MENU:`} weight="bold" />
    <Menu
      defaultActiveIndex={0}
      color={value}
      iconOnly
      items={iconItems.map(item => _.pick(item, ['key', 'icon']))}
    />
    <Text content={`UNDERLINED MENU (mutiple colors):`} weight="bold" />
    {/* <Menu
      defaultActiveIndex={0}
      underlined
      color={{ foreground: value, background: value, border: value }}
      items={items}
    /> */}
  </Grid>
)

export default MenuExampleColor
