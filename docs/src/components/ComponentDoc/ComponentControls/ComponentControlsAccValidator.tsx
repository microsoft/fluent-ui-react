import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsRunAccValidator: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item active={active} onClick={onClick}>
    <Icon color={active ? 'green' : 'grey'} size="large" name="eye slash" fitted />
    Accessibility
  </Menu.Item>
)

ComponentControlsRunAccValidator.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsRunAccValidator)
