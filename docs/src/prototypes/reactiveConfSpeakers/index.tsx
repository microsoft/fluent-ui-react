import * as React from 'react'
import Speaker from './Speaker'
import { mainStyle, speakersGrid } from './styles'
import Slot from '../../../../src/components/Slot/Slot'
import { Grid } from '@stardust-ui/react'
import { speakers } from './data'

export default () => {
  return (
    <Slot styles={mainStyle}>
      <Grid columns="4" styles={speakersGrid} variables={{ gridGap: '10px' }}>
        {speakers.map(speaker => {
          return <Speaker {...speaker} />
        })}
      </Grid>
    </Slot>
  )
}
