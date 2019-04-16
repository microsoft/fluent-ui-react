import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import { Flex, Header, Segment } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ComponentPlaygroundSnippet from 'docs/src/components/ComponentPlaygroundSnippet'
import { examplePlaygroundContext } from 'docs/src/utils'

const playgroundPaths = examplePlaygroundContext.keys()

type ComponentPlaygroundProps = {
  componentName: string
}

const ComponentPlayground: React.FunctionComponent<ComponentPlaygroundProps> = props => {
  const playgroundPath = _.find(playgroundPaths, playgroundPath =>
    _.includes(playgroundPath, `/${props.componentName}/`),
  )

  if (playgroundPath) {
    const PlaygroundComponent: React.FunctionComponent = examplePlaygroundContext(playgroundPath)
      .default

    return (
      <KnobProvider>
        <Flex gap="gap.medium">
          <Flex.Item grow>
            <Flex column>
              <Flex.Item grow>
                <Segment
                  styles={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <PlaygroundComponent />
                </Segment>
              </Flex.Item>
              <ComponentPlaygroundSnippet component={PlaygroundComponent} />
            </Flex>
          </Flex.Item>

          <Flex.Item align="start" push>
            <Segment color="primary">
              <Header as="h4" className="no-anchor" styles={{ marginTop: 0 }}>
                Props
              </Header>
              <KnobInspector />
            </Segment>
          </Flex.Item>
        </Flex>
      </KnobProvider>
    )
  }

  return null
}

export default ComponentPlayground
