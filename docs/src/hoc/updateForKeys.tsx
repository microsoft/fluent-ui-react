import * as _ from 'lodash'
import * as React from 'react'
import * as shallowEqual from 'shallowequal'

const updateForKeys = (propKeys): any => (ChildComponent): any =>
  class extends React.Component {
    shouldComponentUpdate(nextProps) {
      return !shallowEqual(_.pick(this.props, propKeys), _.pick(nextProps, propKeys))
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  }

export default updateForKeys
