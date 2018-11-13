import * as React from 'react'
import { connect } from '../../lib'

// ---------------------------
// SFC custom component exaple
// - this one could have its story - there won't be any need to significantly refactor this component
// to connect it with Stardust
// ---------------------------
const MyClickableButton = props => (
  <button onClick={props.onClick} className={props.classes.root}>
    {props.children}
  </button>
)

// this call makes Stardust connection for Component - follows React Redux pattern
export default connect({
  // transfers Stardust bits to component's props
  // - it is client's decision about which and how all the necessary bits should be named in component's props
  // - thus all the necessary tools are introduced to client to prevent name collisions
  mapToComponentProps: ({ classes, children }) => ({ classes, children }),
})(MyClickableButton)
