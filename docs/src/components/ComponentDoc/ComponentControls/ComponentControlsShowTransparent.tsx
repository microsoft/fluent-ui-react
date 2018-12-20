import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowTransparent: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item active={active} onClick={onClick}>
    <Icon color={active ? 'green' : 'grey'} size="large" name="adjust" fitted />
    Transparent
  </Menu.Item>
)

ComponentControlsShowTransparent.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowTransparent)
