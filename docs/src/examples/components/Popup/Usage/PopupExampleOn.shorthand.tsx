import * as React from 'react'
import { Button, Popup, Grid, Text } from '@stardust-ui/react'

const PopupExampleUsages = () => (
  <Grid columns={3} gridGap="10px">
    <Text content={'Click'} weight="bold" />
    <Text content={'Hover'} weight="bold" />
    <Text content={'Focus'} weight="bold" />
    <Popup trigger={<Button icon="expand" />} content="Hello from popup on click!" on="click" />
    <Popup trigger={<Button icon="expand" />} content="Hello from popup on hover!" on="hover" />
    <Popup trigger={<Button icon="expand" />} content="Hello from popup on focus!" on="focus" />
  </Grid>
)

export default PopupExampleUsages
