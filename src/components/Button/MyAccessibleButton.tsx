import * as React from 'react'
import { connect } from 'src/lib'

// -------------------------------
// CLASS component example
// - note that this could be any component that client was previously working on,
// - and now it is just function call away from collecting Stardust styles, accessibility and other bits
//  -------------------------------
class MyAccessibleButton extends React.Component<any, any> {
  render() {
    const { classes, accessibility, children } = this.props

    return (
      <button className={classes.root} {...accessibility.attributes.root}>
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
