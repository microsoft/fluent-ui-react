import PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowRtl: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    icon={{
      styles: { marginBottom: '10px' },
      size: 'large',
      name: 'align right',
      xspacing: 'both',
    }}
    content="RTL"
    styles={{
      display: 'grid',
      paddingTop: '0px',
    }}
  />
)

ComponentControlsShowRtl.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowRtl)
