import { KnobProvider } from '@stardust-ui/docs-components'
import * as _ from 'lodash'
import * as React from 'react'

import { examplePlaygroundContext } from 'docs/src/utils'
import ComponentPlaygroundTemplate from './ComponentPlaygroundTemplate'
import usePlaygroundComponent from './usePlaygroundComponent'

type ComponentPlaygroundProps = {
  componentName: string
}

const ComponentPlayground: React.FunctionComponent<ComponentPlaygroundProps> = props => {
  const playgroundPaths = examplePlaygroundContext.keys()
  const playgroundPath = _.find(playgroundPaths, playgroundPath =>
    _.includes(playgroundPath, `/${props.componentName}/`),
  )

  if (playgroundPath) {
    const component: React.FC = examplePlaygroundContext(playgroundPath).default

    // Playground can be disabled
    if (component === null) {
      return null
    }

    return <ComponentPlaygroundTemplate component={component} />
  }

  const [element, unsupportedProps] = usePlaygroundComponent(props.componentName)

  return (
    <ComponentPlaygroundTemplate element={element}>
      {process.env.NODE_ENV === 'production' ? null : (
        <div
          style={{
            fontSize: 10,
            border: '2px dotted pink',
            margin: 5,
            padding: 5,
            maxWidth: '200px',
          }}
        >
          <b>Props not supported in playground</b> {unsupportedProps.join(' | ')}
        </div>
      )}
    </ComponentPlaygroundTemplate>
  )
}

export default props => (
  /* KnobProvider should be defined outside otherwise hooks will not properly register */
  <KnobProvider>
    <ComponentPlayground {...props} />
  </KnobProvider>
)
