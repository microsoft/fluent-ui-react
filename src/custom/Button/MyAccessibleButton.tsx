import * as React from 'react'
import { connect } from '../../lib'

// -------------------------------
// CLASS component example
// - note that this could be any component that client was previously working on,
// - and now it is just function call away from collecting Stardust styles, accessibility and other bits
//
// - the original component cared about 'disabled' attribute for button, but hadn't any further accessibility support
// - further accessibility support was added by Stardust's buttonBehavior
//  -------------------------------
class MyAccessibleButton extends React.Component<any, any> {
  render() {
    const { classes, accessibility, children, disabled } = this.props

    return (
      <button disabled={disabled} className={classes.root} {...accessibility.attributes.root}>
        {children}
      </button>
    )
  }
}

export default connect({
  // transfers Stardust bits to component's props
  // - it is client's decision about which and how all the necessary bits should be named in component's props
  mapToComponentProps: ({ classes, accessibility, children }) => ({
    classes,
    accessibility,
    children,
  }),
})(MyAccessibleButton)
