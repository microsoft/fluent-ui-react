import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowCode: any = ({ active, onClick }) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    styles={{
      display: 'grid',
      textAlign: 'center',
    }}
    icon={{
      styles: { color: active ? 'green' : 'grey', marginBottom: '10px' },
      size: 'large',
      name: 'code',
      xspacing: 'both',
    }}
    content="Try it"
  />
)

ComponentControlsShowCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowCode)
