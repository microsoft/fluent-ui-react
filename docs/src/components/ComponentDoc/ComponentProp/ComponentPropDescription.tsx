import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

export default class ComponentPropDescription extends React.PureComponent<any, any> {
  static propTypes = {
    description: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    const { description } = this.props
    return <p>{_.map(description, line => [line, <br key={line} />])}</p>
  }
}
