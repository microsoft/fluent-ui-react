import { KnobInspector, KnobProvider, unstable_KnobContext } from '@stardust-ui/docs-components'
import { Flex, Header, Segment } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ComponentPlaygroundSnippet from 'docs/src/components/ComponentPlaygroundSnippet'
import { examplePlaygroundContext } from 'docs/src/utils'

const playgroundPaths = examplePlaygroundContext.keys()

type ComponentPlaygroundProps = {
  componentName: string
}

const NoopKnobProvider: React.FunctionComponent = props => {
  const knobContext = React.useContext(unstable_KnobContext)
  const noopContext = { ...knobContext, registerKnob: _.noop, unregisterKnob: _.noop }

  return (
    <unstable_KnobContext.Provider value={noopContext}>
      {props.children}
    </unstable_KnobContext.Provider>
  )
}

const ComponentPlayground: React.FunctionComponent<ComponentPlaygroundProps> = props => {
  const resultPath = _.find(playgroundPaths, playgroundPath =>
    _.includes(playgroundPath, `/${props.componentName}/`),
  )

  if (resultPath) {
    const PlaygroundComponent: React.FunctionComponent = examplePlaygroundContext(resultPath)
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
              {/* ComponentPlaygroundSnippet will evaluate passed component again and if it contains
                  knobs it will execute them again and will fail because hooks with that name have
                  been already registered.
                */}
              <NoopKnobProvider>
                <ComponentPlaygroundSnippet component={PlaygroundComponent} />
              </NoopKnobProvider>
            </Flex>
          </Flex.Item>

          <Flex.Item align="start" push>
            <Segment color="brand">
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
