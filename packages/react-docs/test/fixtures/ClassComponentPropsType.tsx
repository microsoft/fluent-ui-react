import * as React from 'react'

type ClassComponentProps = { children: any }

class ClassComponent extends React.Component<ClassComponentProps> {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default ClassComponent
