import React from 'react'
import { Grid, Icon, Provider } from '@stardust-ui/react'

const IconSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <Grid columns={3} style={{ textAlign: 'center' }}>
        {Object.keys(theme.icons).map(name => (
          <div key={name}>
            <div>
              <Icon name={name} />
              <br />
              <code>{name}</code>
            </div>
            <div>
              <Icon name={name} variables={{ outline: true }} />
              <br />
              <code>{name} outline</code>
            </div>
          </div>
        ))}
      </Grid>
    )}
  />
)

export default IconSetExampleShorthand
