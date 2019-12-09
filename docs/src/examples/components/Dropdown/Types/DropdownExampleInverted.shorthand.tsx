import * as React from 'react'
import { Dropdown, Grid } from '@fluentui/react'

const DropdownExampleInverted = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <Dropdown inverted placeholder="Start typing a name" />
    </Grid>
  </div>
)

export default DropdownExampleInverted
