import * as React from 'react'

export class UfdRegion extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      <div role="region" {...rest}>
        {children}
      </div>
    )
  }
}
