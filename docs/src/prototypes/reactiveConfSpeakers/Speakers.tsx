import * as React from 'react'
import { mainContentStyles } from './styles'
import { speakers } from './data'
import { Grid } from '@stardust-ui/react'
import Speaker from './Speaker'

export default () => (
  <Grid columns="4" styles={mainContentStyles} variables={{ gridGap: '10px' }}>
    {speakers.map(speaker => {
      return <Speaker {...speaker} />
    })}
  </Grid>
)
