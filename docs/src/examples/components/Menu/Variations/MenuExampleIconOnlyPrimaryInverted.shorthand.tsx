import React from 'react'
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
      defaultColor: siteVars.gray06,
      defaultBackgroundColor: siteVars.brand,
      typePrimaryActiveBorderColor: siteVars.white,
    })}
  />
)

export default MenuExampleIconOnlyPrimaryInverted
