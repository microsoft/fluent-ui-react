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
    <Text content="Default menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} items={items} />
    <Text content="Pills menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} pills items={items} />
    <Text content="Pointing menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} pointing items={items} />
    <Text content="Vertical pointing menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} vertical pointing items={items} />
    <Text content="Underlined menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} underlined items={items} />
    <Text content="Icon menu:" weight="bold" />
    <Menu defaultActiveIndex={0} color={value} items={iconItems} />
    <Text content="Icon only menu:" weight="bold" />
    <Menu
      defaultActiveIndex={0}
      color={value}
      iconOnly
      items={iconItems.map(item => _.pick(item, ['key', 'icon']))}
    />
  </Grid>
)

export default MenuExampleColor
