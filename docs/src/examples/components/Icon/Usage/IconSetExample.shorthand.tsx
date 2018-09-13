import React from 'react'
import { Grid, Icon, Provider } from '@stardust-ui/react'

const IconSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <Grid columns={3} style={{ textAlign: 'center' }}>
        {Object.keys(theme.icons).map(name => (
          <span>
            <Icon svg key={name} name={name} />
            <br />
            <code>{name}</code>
          </span>
        ))}
      </Grid>
    )}
  />
)

export default IconSetExampleShorthand
