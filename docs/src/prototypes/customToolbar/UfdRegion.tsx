import * as React from 'react'

export class UfdRegion extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props
    // TODO: should this render something if there is no children?
    return (
      <div role="region" {...rest}>
        {children}
      </div>
    )
  }
}
