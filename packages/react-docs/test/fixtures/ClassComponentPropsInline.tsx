import * as React from 'react'

class ClassComponent extends React.Component<{ children: any }> {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default ClassComponent
