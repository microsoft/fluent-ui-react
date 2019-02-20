import * as PropTypes from 'prop-types'
import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowVariables: any = ({ active }) => {
  const btnLabel = 'Theme it'

  return <LabelledButton iconName="paint brush" label={btnLabel} active={active} />
}

ComponentControlsShowVariables.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowVariables)
