import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

export default class ComponentPropDefaultValue extends React.PureComponent<any, any> {
  static propTypes = {
    value: PropTypes.node,
  }

  render() {
    const { value } = this.props
    return _.isNil(value) ? null : (
      <code>{value.indexOf('_1.') === -1 ? value : value.split('_1.')[1]}</code>
    )
  }
}
