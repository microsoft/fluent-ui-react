import * as PropTypes from 'prop-types'
import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'

const toggleStyle = {
  cursor: 'pointer',
}

const ComponentPropEnumToggle: any = ({ showAll, toggle, total }) => (
  <a style={toggleStyle} onClick={toggle}>
    {showAll ? 'Show less' : `Show all ${total}`}
  </a>
)

ComponentPropEnumToggle.propTypes = {
  showAll: PropTypes.bool,
  toggle: PropTypes.func,
  total: PropTypes.number,
}

export default updateForKeys(['showAll'])(ComponentPropEnumToggle)
