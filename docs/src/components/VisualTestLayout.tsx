import * as _ from 'lodash/fp'
import PropTypes from 'prop-types'
import * as React from 'react'

import { exampleContext, parseExamplePath } from 'docs/src/utils'
import Provider from 'src/components/Provider/Provider'
import PageNotFound from '../views/PageNotFound'

const allExamplePaths = exampleContext.keys()

const exampleStyle = {
  padding: '1rem',
  margin: '1rem',
  height: '100vh',
  border: '2px solid black',
}

const VisualTestLayout: any = props => {
  const { match } = props
  const displayName = _.startCase(match.params.kebabComponentName).replace(/ /g, '')

  const componentExamplePaths = _.filter(path => {
    if (/index\.tsx$/.test(path)) return false

    return displayName === parseExamplePath(path).displayName
  }, allExamplePaths)

  if (_.isEmpty(componentExamplePaths)) return <PageNotFound />

  return componentExamplePaths.map(path => {
    const ExampleComponent = exampleContext(path).default
    const { exampleName } = parseExamplePath(path)

    return (
      <div key={path}>
        <div style={exampleStyle}>
          <h3>{exampleName} - Default Theme, LTR</h3>
          <ExampleComponent />
        </div>

        <div style={exampleStyle}>
          <h3>{exampleName} - Default Theme, RTL</h3>
          <Provider theme={{ rtl: true }}>
            <div dir="rtl">
              <ExampleComponent />
            </div>
          </Provider>
        </div>
      </div>
    )
  })
}

VisualTestLayout.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default VisualTestLayout
