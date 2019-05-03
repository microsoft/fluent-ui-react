import * as PropTypes from 'prop-types'
import * as React from 'react'

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

const arePropsEqual = () => true

export default React.memo(ComponentPropEnumValue, arePropsEqual)
