import * as React from 'react'
import { Grid, Dropdown } from '@stardust-ui/react'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth']

const DropdownExamplePosition = () => (
  <Grid columns="1, 80px" variables={{ padding: '30px' }}>
    <Dropdown
      items={inputItems}
      placeholder="Select your hero"
      align="start"
      position="above"
      offset="-100%p"
    />
  </Grid>
)

export default DropdownExamplePosition
