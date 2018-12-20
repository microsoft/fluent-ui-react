import * as PropTypes from 'prop-types'
import * as React from 'react'

import { neverUpdate } from 'docs/src/hoc'

const spanStyle = {
  display: 'inline-block',
  paddingRight: '0.2em',
}

const ComponentPropEnumValue: any = ({ children }) => (
  <span style={spanStyle}>
    <code>{children}</code>
  </span>
)

ComponentPropEnumValue.propTypes = {
  children: PropTypes.node,
}

export default neverUpdate(ComponentPropEnumValue)
