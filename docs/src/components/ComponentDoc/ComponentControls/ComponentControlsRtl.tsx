import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowRtl: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    icon={{
      styles: { color: active ? 'green' : 'grey', marginBottom: '10px' },
      size: 'large',
      name: 'align right',
      xspacing: 'both',
    }}
    content="RTL"
    styles={{
      display: 'grid',
      textAlign: 'center',
    }}
  />
)

ComponentControlsShowRtl.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowRtl)
