import * as React from 'react'

const neverUpdate = (ChildComponent): any =>
  class extends React.Component {
    shouldComponentUpdate() {
      return false
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  }

export default neverUpdate
