import * as React from 'react'
import { connect } from 'src/lib'

// ---------------------------
// SFC custom component exaple
// - this one could have its story - there won't be any need to significantly refactor this component
// to connect it with Stardust
// ---------------------------
const MyButton = props => <button className={props.classes.root}>Hello there!</button>

// this call makes Stardust connection for Component - follows React Redux pattern
export default connect({
  // transfers Stardust bits to component's props
  // - it is client's decision about which and how all the necessary bits should be named in component's props
  mapToComponentProps: ({ classes, children }) => ({ classes, children }),
})(MyButton)
