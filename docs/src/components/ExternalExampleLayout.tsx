import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import SourceRender from 'react-source-render'

import { ExampleSource } from 'docs/src/types'
import {
  exampleSourcesContext,
  exampleKebabNameToSourceFilename,
  parseExamplePath,
} from 'docs/src/utils'
import PageNotFound from '../views/PageNotFound'
import { babelConfig, importResolver } from './Playground/renderConfig'
import Provider from '../../../src/components/Provider/Provider'

const examplePaths = exampleSourcesContext.keys()

const ExternalExampleLayout: any = props => {
  const { exampleName, rtl } = props.match.params
  const exampleFilename = exampleKebabNameToSourceFilename(exampleName)
  console.log(exampleFilename)
  const examplePath = _.find(examplePaths, path => {
    const { exampleName } = parseExamplePath(path)
    return exampleFilename === exampleName
  })
  console.log(examplePath)
  if (!examplePath) return <PageNotFound />
  const exampleSource: ExampleSource = exampleSourcesContext(examplePath)

  return (
    <Provider theme={{ rtl: rtl === 'true' ? true : false }}>
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
              {error && <div style={{ fontSize: '5rem', color: 'red' }}>{error.toString()}</div>}
            </>
          )}
        </SourceRender.Consumer>
      </SourceRender>
    </Provider>
  )
}

ExternalExampleLayout.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      exampleName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default ExternalExampleLayout
