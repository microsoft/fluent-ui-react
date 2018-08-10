import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import ComponentDoc from '../components/ComponentDoc'
import PageNotFound from '../views/PageNotFound'
import componentInfo from '../utils/componentInfo'

class DocsRoot extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    }),
  }

  state = {}

  render() {
    const { match } = this.props
    const displayName = _.startCase(match.params.name).replace(/ /g, '')
    const info = componentInfo.byDisplayName[displayName]

    if (info) return <ComponentDoc info={info} />

    return <PageNotFound />
  }
}

export default DocsRoot
