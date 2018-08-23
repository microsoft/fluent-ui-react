import * as _ from 'lodash/fp'
import PropTypes from 'prop-types'
import * as React from 'react'

import { exampleContext, exampleKebabNameToFilename, parseExamplePath } from 'docs/src/utils'
import PageNotFound from '../views/PageNotFound'

const examplePaths = exampleContext.keys()

const ExternalExampleLayout: any = props => {
  const { exampleName } = props.match.params
  const exampleFilename = exampleKebabNameToFilename(exampleName)

  const examplePath = _.find(path => {
    const { exampleName } = parseExamplePath(path)
    return exampleFilename === exampleName
  }, examplePaths)

  if (!examplePath) return <PageNotFound />

  const ExampleComponent = exampleContext(examplePath).default
  if (!ExampleComponent) return <PageNotFound />

  return <ExampleComponent />
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
