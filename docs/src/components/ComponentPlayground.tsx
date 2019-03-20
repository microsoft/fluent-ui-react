import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import { Flex, Segment } from '@stardust-ui/react'
import * as React from 'react'

const ComponentPlayground: React.FunctionComponent = props => {
  console.log(props.children)
  return (
    <KnobProvider>
      <Flex gap="gap.medium">
        <Flex.Item grow>
          <Flex column>
            <Segment
              styles={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 250,
              }}
            >
              {props.children}
            </Segment>
          </Flex>
        </Flex.Item>

        <Flex.Item align="start" push>
          <Segment color="primary">
            <KnobInspector />
          </Segment>
        </Flex.Item>
      </Flex>
    </KnobProvider>
  )
}

export default ComponentPlayground
