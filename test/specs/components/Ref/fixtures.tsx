import * as React from 'react'
import Component = React.Component

export const DOMFunction = props => <div {...props} id="node" />

export const CompositeFunction = props => <DOMFunction {...props} />

export class DOMClass extends Component {
  render() {
    return <div {...this.props} id="node" />
  }
}

export class CompositeClass extends Component {
  render() {
    return <DOMClass {...this.props} />
  }
}

export const ForwardedRef = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <div>
    <button ref={ref} />
  </div>
))
