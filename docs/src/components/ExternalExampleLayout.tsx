import { Provider } from '@stardust-ui/react'
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
}

class ExternalExampleLayout extends React.Component<
  ExternalExampleLayoutProps,
  ExternalExampleLayoutState
> {
  state = {
    renderId: 0,
  }

  componentDidMount() {
    window.resetExternalLayout = () =>
      this.setState(prevState => ({ renderId: prevState.renderId + 1 }))
  }

  render() {
    const { exampleName, rtl } = this.props.match.params
    const exampleFilename = exampleKebabNameToSourceFilename(exampleName)

    const examplePath = _.find(examplePaths, path => {
      const { exampleName } = parseExamplePath(path)
      return exampleFilename === exampleName
    })

    if (!examplePath) return <PageNotFound />
    const exampleSource: ExampleSource = exampleSourcesContext(examplePath)
    const isRtlEnabled = rtl === 'true'

    return (
      <Provider key={this.state.renderId} theme={{ rtl: isRtlEnabled }}>
        <Provider.Consumer
          render={({ siteVariables }) => (
            <div
              dir={isRtlEnabled ? 'rtl' : undefined}
              style={{
                color: siteVariables.bodyColor,
                backgroundColor: siteVariables.bodyBackground,
              }}
            >
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
            </div>
          )}
        />
      </Provider>
    )
  }
}

export default ExternalExampleLayout
