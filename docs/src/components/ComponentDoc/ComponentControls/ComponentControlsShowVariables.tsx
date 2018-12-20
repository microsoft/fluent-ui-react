import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowVariables: any = ({ active, onClick }) => {
  const btnLabel = 'Theme it'

  return (
    <Menu.Item
      active={active}
      onClick={onClick}
      content={<LabelledButton iconName="paint brush" label={btnLabel} active={active} />}
    />
  )
}

ComponentControlsShowVariables.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowVariables)
