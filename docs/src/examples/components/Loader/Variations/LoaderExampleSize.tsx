import { Grid, Loader } from '@stardust-ui/react'
import * as React from 'react'

const LoaderExampleSize: React.FC = () => (
  <Grid columns="3" variables={{ gridGap: '20px' }}>
    <Loader size="smallest" />
    <Loader size="smaller" />
    <Loader size="small" />

    <Loader size="large" />
    <Loader size="larger" />
    <Loader size="largest" />
  </Grid>
)

export default LoaderExampleSize
