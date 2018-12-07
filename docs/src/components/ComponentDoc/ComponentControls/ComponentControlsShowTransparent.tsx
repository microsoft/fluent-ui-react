import PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Menu } from '@stardust-ui/react'
import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowTransparent: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    styles={{
      display: 'grid',
      textAlign: 'center',
    }}
    icon={{
      size: 'large',
      name: 'adjust',
      styles: { color: active ? 'green' : 'grey', marginBottom: '10px' },
    }}
    content="Transparent"
  />
)

ComponentControlsShowTransparent.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowTransparent)
