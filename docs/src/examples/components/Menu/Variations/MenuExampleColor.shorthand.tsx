import * as React from 'react'
import * as _ from 'lodash'
import { Menu, ProviderConsumer, Grid } from '@stardust-ui/react'

const MenuExampleColor = () => (
  <Grid
    columns="auto"
    styles={{ justifyContent: 'left', justifyItems: 'left' }}
    variables={{ gridGap: '10px' }}
  >
    <ProviderConsumer
      render={({ siteVariables: { colorScheme } }) => (
        <Menu
          defaultActiveIndex={0}
          items={_.keys(colorScheme).map(color => ({
            key: color,
            color,
            content: _.startCase(color),
          }))}
        />
      )}
    />
  </Grid>
)

export default MenuExampleColor
