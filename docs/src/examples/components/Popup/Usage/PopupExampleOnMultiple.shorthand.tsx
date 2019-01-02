import * as React from 'react'
import { Button, Popup, Grid, Text } from '@stardust-ui/react'

const PopupExampleHover = () => (
  <Grid columns={2}>
    <Text content={'Click + Focus'} weight="bold" />
    <Text content={'Hover + Focus'} weight="bold" />
    <Popup
      trigger={<Button icon="expand" />}
      content="Hello from popup on click!"
      on={['click', 'focus']}
    />
    <Popup
      trigger={<Button icon="expand" />}
      content="Hello from popup on hover!"
      on={['hover', 'focus']}
    />
  </Grid>
)

export default PopupExampleHover
