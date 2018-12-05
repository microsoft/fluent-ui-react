import { KnobInspector, KnobProvider, unstable_KnobContext } from '@stardust-ui/docs-components'
import { Flex, Header, ProviderContextPrepared, Segment } from '@stardust-ui/react'
import * as Stardust from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import ComponentPlaygroundSnippet from 'docs/src/components/ComponentPlaygroundSnippet'
import { examplePlaygroundContext } from 'docs/src/utils'
import generateHooks from 'docs/src/components/ComponentDoc/generateHooks'
import theme from 'src/themes/teams/withProcessedIcons'

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

const KnobHost: React.FunctionComponent = props => {
  const { componentName, info } = props

  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const [hooks, unsupportedProps] = generateHooks(info, context.theme)
  console.log(hooks, unsupportedProps)
  if (!Stardust[componentName]) {
    throw new Error('!!!!')
  }

  const computedProps = {}

  hooks.forEach(hookDef => {
    const { hook, ...options } = hookDef
    const [propValue] = hook(options)

    if (_.isUndefined(propValue)) {
      return
    }

    if (options.name === 'as' && propValue === 'div') {
      return
    }

    computedProps[options.name] = propValue
  })

  return React.createElement(Stardust[componentName], computedProps)
}

const ComponentPlayground: React.FunctionComponent<ComponentPlaygroundProps> = props => {
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
                <KnobHost componentName={props.componentName} info={props.info} />
              </Segment>
            </Flex.Item>
            {/* ComponentPlaygroundSnippet will evaluate passed component again and if it contains
                  knobs it will execute them again and will fail because hooks with that name have
                  been already registered.
                */}
            <NoopKnobProvider>
              <ComponentPlaygroundSnippet
                componentName={props.componentName}
                info={props.info}
                component={KnobHost}
              />
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

export default ComponentPlayground
