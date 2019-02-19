import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowRtl: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item active={active} onClick={onClick}>
    <Icon color={active ? 'green' : 'grey'} size="large" name="align right" fitted />
    RTL
  </Menu.Item>
)

ComponentControlsShowRtl.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowRtl)
