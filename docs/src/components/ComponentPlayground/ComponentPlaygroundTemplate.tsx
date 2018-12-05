import { KnobInspector, unstable_KnobContext } from '@stardust-ui/docs-components'
import { Flex, Header, Segment } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ComponentPlaygroundSnippet from './ComponentPlaygroundSnippet'

type ComponentPlaygroundTemplateProps = {
  element?: React.ReactElement
  component?: React.FunctionComponent
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

const ComponentPlaygroundTemplate: React.FunctionComponent<
  ComponentPlaygroundTemplateProps
> = props => (
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
            {props.element || React.createElement(props.component)}
          </Segment>
        </Flex.Item>

        {/* ComponentPlaygroundSnippet will evaluate passed component again and if it contains
            knobs it will execute them again and will fail because hooks with that name have
            been already registered.
          */}
        <NoopKnobProvider>
          <ComponentPlaygroundSnippet element={props.element} component={props.component} />
        </NoopKnobProvider>
      </Flex>
    </Flex.Item>

    <Flex.Item align="start" push>
      <Segment color="brand">
        <Header as="h4" className="no-anchor" styles={{ marginTop: 0 }}>
          Props
        </Header>
        <KnobInspector />
        {props.children}
      </Segment>
    </Flex.Item>
  </Flex>
)

export default ComponentPlaygroundTemplate
