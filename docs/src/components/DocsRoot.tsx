import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import ComponentDoc from '../components/ComponentDoc'
import PageNotFound from '../views/PageNotFound'
import componentInfoContext from '../utils/componentInfoContext'
import DocsBehaviorRoot from './DocsBehaviorRoot'

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
    if (match.params.type === 'behaviors') {
      return <DocsBehaviorRoot {...this.props} />
    }
    const info = componentInfoContext.byDisplayName[displayName]

    if (info) return <ComponentDoc info={info} />

    return <PageNotFound />
  }
}

export default DocsRoot
