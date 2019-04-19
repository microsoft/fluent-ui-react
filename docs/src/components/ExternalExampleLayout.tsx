import { Provider, themes, ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { match } from 'react-router'
import SourceRender from 'react-source-render'

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

    const examplePath = _.find(examplePaths, path => {
      const { exampleName } = parseExamplePath(path)
      return exampleFilename === exampleName
    })

    if (!examplePath) return <PageNotFound />

    const exampleSource: ExampleSource = exampleSourcesContext(examplePath)
    const theme = this.getTheme()

    return (
      <Provider key={this.state.renderId} theme={theme}>
        <Provider.Consumer
          render={({ siteVariables }) => (
            <SourceRender
              babelConfig={babelConfig}
              source={exampleSource.js}
              renderHtml={false}
              resolver={importResolver}
            >
              <SourceRender.Consumer>
                {({ element, error }) => (
                  <>
                    {element}
                    {/* This block allows to see issues with examples as visual regressions. */}
                    {error && (
                      <div style={{ fontSize: '5rem', color: 'red' }}>{error.toString()}</div>
                    )}
                  </>
                )}
              </SourceRender.Consumer>
            </SourceRender>
          )}
        />
      </Provider>
    )
  }

  private getTheme = (): ThemeInput => {
    const { themeName } = this.state
    const theme: ThemeInput = (themeName && themes[themeName]) || {}

    theme.rtl = this.props.match.params.rtl === 'true'
    return theme
  }
}

export default ExternalExampleLayout
