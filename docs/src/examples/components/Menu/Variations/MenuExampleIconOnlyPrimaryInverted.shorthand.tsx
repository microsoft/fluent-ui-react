import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', icon: 'home' },
  { key: 'users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

const MenuExampleIconOnlyPrimaryInverted = () => (
  <Menu
    iconOnly
    defaultActiveIndex={0}
    items={items}
    primary
    variables={siteVars => ({
      color: siteVars.gray06,
      backgroundColor: siteVars.brand,
      primaryActiveBorderColor: siteVars.white,
    })}
  />
)

export default MenuExampleIconOnlyPrimaryInverted
