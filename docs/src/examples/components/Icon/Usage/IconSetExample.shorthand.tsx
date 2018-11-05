import React from 'react'
import { Grid, Icon, Provider } from '@stardust-ui/react'

const cellStyles = {
  margin: '10px 0',
}

const IconSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <Grid columns={5} style={{ textAlign: 'center' }}>
        {Object.keys(theme.icons).map(name => (
          <div key={name} style={cellStyles}>
            <Icon name={name} size="big" />
            <br />
            <code>{name}</code>
          </div>
        ))}
        {Object.keys(theme.icons).map(name => (
          <div key={name + '-outline'} style={cellStyles}>
            <Icon name={name} size="big" variables={{ outline: true }} />
            <br />
            <code>{name} outline</code>
          </div>
        ))}
      </Grid>
    )}
  />
)

export default IconSetExampleShorthand
