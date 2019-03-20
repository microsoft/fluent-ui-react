import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import { Flex, Segment } from '@stardust-ui/react'
import * as React from 'react'

const ComponentPlayground: React.FunctionComponent = props => (
  <KnobProvider>
    <Flex gap="gap.medium">
      <Flex.Item grow>
        <Segment
          styles={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {props.children}
        </Segment>
      </Flex.Item>

      <Flex.Item align="start" push>
        <Segment color="primary">
          <KnobInspector />
        </Segment>
      </Flex.Item>
    </Flex>
  </KnobProvider>
)

export default ComponentPlayground
