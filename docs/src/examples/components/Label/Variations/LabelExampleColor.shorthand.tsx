import * as React from 'react'
import * as _ from 'lodash'
import { Label, ProviderConsumer, Grid } from '@stardust-ui/react'

const LabelExampleColor = () => (
  <Grid
    columns="auto"
    styles={{ justifyContent: 'left', justifyItems: 'left' }}
    variables={{ gridGap: '10px' }}
  >
    <ProviderConsumer
      render={({ siteVariables: { colorScheme } }) =>
        _.keys(colorScheme).map(color => (
          <Label key={color} color={color} content={_.startCase(color)} />
        ))
      }
    />
  </Grid>
)

export default LabelExampleColor
