import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Icon, Grid, Text, ProviderConsumer } from '@stardust-ui/react'

const IconExampleColor = () => (
  <Grid columns="repeat(4, auto)" styles={{ alignItems: 'center' }} variables={{ gridGap: '10px' }}>
    <Text content="INHERITED COLOR:" weight="bold" />
    <Flex gap="gap.small" style={{ color: 'violet' }}>
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </Flex>
    <Text content="INHERITED COLOR FOR OUTLINED ICONS:" weight="bold" />
    <Flex gap="gap.small" style={{ color: 'yellowgreen' }}>
      <Icon name="calendar" bordered variables={{ outline: true }} />
      <Icon name="call" bordered variables={{ outline: true }} />
      <Icon name="call-video" bordered variables={{ outline: true }} />
    </Flex>
    <Text weight="bold">
      USING THE <code>color</code> VARIABLE:
    </Text>
    <Flex gap="gap.small">
      <Icon name="calendar" bordered variables={{ color: 'violet' }} />
      <Icon name="call" bordered variables={{ color: 'yellowgreen' }} />
      <Icon name="call-video" bordered variables={{ color: 'cornflowerblue' }} />
    </Flex>
    <Text weight="bold">
      USING THE <code>borderColor</code> VARIABLE:
    </Text>
    <Flex gap="gap.small">
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
    </Flex>
    <Text weight="bold">
      USING THE <code>color</code> PROP:
    </Text>
    <ProviderConsumer
      render={({ siteVariables: { emphasisColors, naturalColors } }) => (
        <Flex gap="gap.small">
          {_.take(_.keys({ ...emphasisColors, ...naturalColors }), 3).map(color => (
            <Icon key={color} name="call" bordered color={color} />
          ))}
        </Flex>
      )}
    />
  </Grid>
)

export default IconExampleColor
