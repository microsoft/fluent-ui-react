import React from 'react'
import { Icon, Grid, Text } from '@stardust-ui/react'

const IconExampleColor = () => (
  <Grid columns="repeat(4, auto)" styles={{ alignItems: 'center' }}>
    <Text content="INHERITED COLOR:" weight="bold" />
    <div style={{ color: 'violet' }}>
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </div>
    <Text content="INHERITED COLOR FOR OUTLINE ICONS:" weight="bold" />
    <div style={{ color: 'yellowgreen' }}>
      <Icon name="calendar" bordered variables={{ outline: true }} />
      <Icon name="call" bordered variables={{ outline: true }} />
      <Icon name="call-video" bordered variables={{ outline: true }} />
    </div>
    <Text
      content={
        <span>
          USING THE <code>color</code> VARIABLE:
        </span>
      }
      weight="bold"
    />
    <div>
      <Icon name="calendar" bordered variables={{ color: 'violet' }} />
      <Icon name="call" bordered variables={{ color: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ color: 'cornflowerblue' }} />
    </div>
    <Text
      content={
        <span>
          USING THE <code>borderColor</code> VARIABLE:
        </span>
      }
      weight="bold"
    />
    <div>
      <Icon
        name="calendar"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'violet' }}
      />
      <Icon
        name="call"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'yellowgreen' }}
      />
      <Icon
        name="call-video"
        bordered
        variables={{ color: 'cornflowerblue', borderColor: 'orangered' }}
      />
    </div>
  </Grid>
)

export default IconExampleColor
