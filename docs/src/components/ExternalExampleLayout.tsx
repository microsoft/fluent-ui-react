import { Provider, themes } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { match } from 'react-router-dom'
import SourceRender from 'react-source-render'
import { KnobProvider } from '@stardust-ui/docs-components'

import { ExampleSource } from 'docs/src/types'
import {
  exampleSourcesContext,
  exampleKebabNameToSourceFilename,
  parseExamplePath,
} from 'docs/src/utils'
import PageNotFound from '../views/PageNotFound'
import { babelConfig, importResolver } from './Playground/renderConfig'

const examplePaths = exampleSourcesContext.keys()

type ExternalExampleLayoutProps = {
  match: match<{
    exampleName: string
    rtl: string
  }>
}

type ExternalExampleLayoutState = {
  renderId: number
  themeName: string
}

class ExternalExampleLayout extends React.Component<
  ExternalExampleLayoutProps,
  ExternalExampleLayoutState
> {
  state = {
    renderId: 0,
    themeName: undefined,
  }

  componentDidMount() {
    window.resetExternalLayout = () =>
      this.setState(prevState => ({ renderId: prevState.renderId + 1 }))

    window.switchTheme = (themeName: string) => this.setState({ themeName })
  }

  render() {
    const { exampleName } = this.props.match.params
    const exampleFilename = exampleKebabNameToSourceFilename(exampleName)

    const examplePath = _.find(
      examplePaths,
      path => exampleFilename === parseExamplePath(path).exampleName,
    )

    if (!examplePath) return <PageNotFound />

    const exampleSource: ExampleSource = exampleSourcesContext(examplePath)

    const { themeName } = this.state
    const theme = (themeName && themes[themeName]) || {}

    return (
      <Provider
        key={this.state.renderId}
        theme={theme}
        rtl={this.props.match.params.rtl === 'true'}
      >
        <KnobProvider>
          <SourceRender
            babelConfig={babelConfig}
            source={exampleSource.js}
            renderHtml={false}
            resolver={importResolver}
            unstable_hot
          >
            {({ element, error }) => (
              <>
                {element}
                {/* This block allows to see issues with examples as visual regressions. */}
                {error && <div style={{ fontSize: '5rem', color: 'red' }}>{error.toString()}</div>}
              </>
            )}
          </SourceRender>
        </KnobProvider>
      </Provider>
    )
  }
}

export default ExternalExampleLayout
