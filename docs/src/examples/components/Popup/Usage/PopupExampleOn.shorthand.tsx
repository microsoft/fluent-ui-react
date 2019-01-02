import * as React from 'react'
import { Button, Popup, Grid, Text } from '@stardust-ui/react'

const PopupExampleOn = () => (
  <Grid columns={3} variables={{ gridGap: '10px' }}>
    <Text content="Click" weight="bold" />
    <Text content="Hover" weight="bold" />
    <Text content="Focus" weight="bold" />

    <Popup
      trigger={<Button icon="expand" aria-label="Click button" />}
      content="Hello from popup on click!"
      on="click"
    />
    <Popup
      trigger={<Button icon="expand" aria-label="Hover button" />}
      content="Hello from popup on hover!"
      on="hover"
    />
    <Popup
      trigger={<Button icon="expand" aria-label="Focus button" />}
      content="Hello from popup on focus!"
      on="focus"
    />
  </Grid>
)

export default PopupExampleOn
