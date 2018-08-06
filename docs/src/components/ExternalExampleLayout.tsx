import * as _ from 'lodash/fp'
import PropTypes from 'prop-types'
import * as React from 'react'

import { exampleContext } from 'docs/src/utils'
import PageNotFound from '../views/PageNotFound'

const exampleKeys = exampleContext.keys()

const ExternalExampleLayout: any = props => {
  const { exampleName } = props.match.params
  const exampleFilename = `/${_.startCase(exampleName).replace(/ /g, '')}.tsx`

  const componentKey = _.find(_.endsWith(exampleFilename), exampleKeys)
  if (!componentKey) return <PageNotFound />

  const ExampleComponent = exampleContext(componentKey).default
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
