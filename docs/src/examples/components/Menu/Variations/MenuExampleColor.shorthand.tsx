import * as React from 'react'
import * as _ from 'lodash'
import { Menu, ProviderConsumer, Grid, Text } from '@stardust-ui/react'

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

const MenuExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { colorScheme } }) => {
      const colorsArr = _.keys(colorScheme)
      const colors = _.times(7, num => colorsArr[num % colorsArr.length])

      return (
        <Grid
          columns="repeat(2, auto)"
          styles={{ justifyContent: 'left', justifyItems: 'left', alignItems: 'center' }}
          variables={{ gridGap: '10px' }}
        >
          <Text content={`${_.upperCase(colors[0])} DEFAULT MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[0]} items={items} />
          <Text content={`${_.upperCase(colors[1])} PILLS MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[1]} pills items={items} />
          <Text content={`${_.upperCase(colors[2])} POINTING MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[2]} pointing items={items} />
          <Text content={`${_.upperCase(colors[3])} VERTICAL POINTING MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[3]} vertical pointing items={items} />
          <Text content={`${_.upperCase(colors[4])} UNDERLINED MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[4]} underlined items={items} />
          <Text content={`${_.upperCase(colors[5])} ICON MENU:`} weight="bold" />
          <Menu defaultActiveIndex={0} color={colors[5]} items={iconItems} />
          <Text content={`${_.upperCase(colors[6])} ICON ONLY MENU:`} weight="bold" />
          <Menu
            defaultActiveIndex={0}
            color={colors[6]}
            iconOnly
            items={iconItems.map(item => _.pick(item, ['key', 'icon']))}
          />
          <Text content={`UNDERLINED MENU (mutiple colors):`} weight="bold" />
          <Menu
            defaultActiveIndex={0}
            underlined
            color={{ foreground: colors[4], background: colors[6], border: colors[1] }}
            items={items}
          />
        </Grid>
      )
    }}
  />
)

export default MenuExampleColor
