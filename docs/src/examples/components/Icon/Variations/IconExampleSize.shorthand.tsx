import * as React from 'react'
import { Grid, Icon } from '@stardust-ui/react'

const IconExampleSize = () => (
  <Grid rows={2} style={{ textAlign: 'center' }}>
    <Icon name="home" size="smallest" />
    <Icon name="call-video" size="smallest" />

    <Icon name="home" size="smaller" />
    <Icon name="call-video" size="smaller" />

    <Icon name="home" size="small" />
    <Icon name="call-video" size="small" />

    <Icon name="home" />
    <Icon name="call-video" />

    <Icon name="home" size="large" />
    <Icon name="call-video" size="large" />

    <Icon name="home" size="larger" />
    <Icon name="call-video" size="larger" />

    <Icon name="home" size="largest" />
    <Icon name="call-video" size="largest" />
  </Grid>
)

export default IconExampleSize
