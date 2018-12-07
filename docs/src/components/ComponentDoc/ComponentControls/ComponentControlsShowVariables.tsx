import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowVariables: any = ({ active, onClick }) => {
  const btnLabel = 'Theme it'

  return (
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
        name: 'paint brush',
        xspacing: 'both',
      }}
      content={btnLabel}
    />
  )
}

ComponentControlsShowVariables.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowVariables)
