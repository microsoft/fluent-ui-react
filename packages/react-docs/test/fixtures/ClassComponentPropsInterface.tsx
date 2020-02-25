import * as React from 'react'

interface ClassComponentProps {
  children: any
}

class ClassComponent extends React.Component<ClassComponentProps> {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default ClassComponent
