import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import { Flex, Header, Segment } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import { examplePlaygroundContext } from 'docs/src/utils'
import CodeSnippet from 'docs/src/components/CodeSnippet'
import renderElementToJSX from 'docs/src/components/ExampleSnippet/renderElementToJSX'

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
    const jsxMarkup = renderElementToJSX(PlaygroundComponent(null))

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
                }}
              >
                <PlaygroundComponent />
              </Segment>
              <CodeSnippet mode="jsx" value={jsxMarkup} />
            </Flex>
          </Flex.Item>

          <Flex.Item align="start" push>
            <Segment color="primary">
              <Header as="h4" styles={{ marginTop: 0 }}>
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
