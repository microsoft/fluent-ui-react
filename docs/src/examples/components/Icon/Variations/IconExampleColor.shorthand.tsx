import * as React from 'react'
import * as _ from 'lodash'
import { Icon, Grid, Text, ProviderConsumer } from '@stardust-ui/react'

const IconExampleColor = () => (
  <Grid columns="repeat(4, auto)" styles={{ alignItems: 'center' }} variables={{ gridGap: '10px' }}>
    <Text content="INHERITED COLOR:" weight="bold" />
    <div style={{ color: 'violet' }}>
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </div>
    <Text content="INHERITED COLOR FOR OUTLINED ICONS:" weight="bold" />
    <div style={{ color: 'yellowgreen' }}>
      <Icon name="calendar" bordered variables={{ outline: true }} />
      <Icon name="call" bordered variables={{ outline: true }} />
      <Icon name="call-video" bordered variables={{ outline: true }} />
    </div>
    <Text weight="bold">
      USING THE <code>color</code> VARIABLE:
    </Text>
    <div>
      <Icon name="calendar" bordered variables={{ color: 'violet' }} />
      <Icon name="call" bordered variables={{ color: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ color: 'cornflowerblue' }} />
    </div>
    <Text weight="bold">
      USING THE <code>borderColor</code> VARIABLE:
    </Text>
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
    <Text weight="bold">
      USING THE <code>color</code> PROP:
    </Text>
    <div>
      <ProviderConsumer
        render={({ siteVariables: { emphasisColors, naturalColors } }) =>
          _.take(_.keys({ ...emphasisColors, ...naturalColors }), 3).map(color => (
            <Icon key={color} name="call" bordered color={color} />
          ))
        }
      />
    </div>
  </Grid>
)

export default IconExampleColor
