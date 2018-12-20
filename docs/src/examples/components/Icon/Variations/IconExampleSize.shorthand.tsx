import * as React from 'react'
import { Grid, Icon } from '@stardust-ui/react'

const IconExampleSize = () => (
  <Grid rows={2} style={{ textAlign: 'center' }}>
    <Icon name="home" size="micro" />
    <Icon name="call-video" size="micro" />

    <Icon name="home" size="mini" />
    <Icon name="call-video" size="mini" />

    <Icon name="home" size="tiny" />
    <Icon name="call-video" size="tiny" />

    <Icon name="home" size="small" />
    <Icon name="call-video" size="small" />

    <Icon name="home" />
    <Icon name="call-video" />

    <Icon name="home" size="large" />
    <Icon name="call-video" size="large" />

    <Icon name="home" size="big" />
    <Icon name="call-video" size="big" />

    <Icon name="home" size="huge" />
    <Icon name="call-video" size="huge" />

    <Icon name="home" size="massive" />
    <Icon name="call-video" size="massive" />
  </Grid>
)

export default IconExampleSize
