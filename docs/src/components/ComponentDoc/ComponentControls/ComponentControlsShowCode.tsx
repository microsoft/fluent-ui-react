import * as PropTypes from 'prop-types'
import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowCode: any = ({ active }) => (
  <LabelledButton iconName="code" label="Try it" active={active} />
)

ComponentControlsShowCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowCode)
