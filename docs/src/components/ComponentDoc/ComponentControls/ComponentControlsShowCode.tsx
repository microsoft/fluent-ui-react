import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowCode: any = ({ active, onClick }) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    content={<LabelledButton iconName="code" label="Try it" active={active} />}
  />
)

ComponentControlsShowCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowCode)
