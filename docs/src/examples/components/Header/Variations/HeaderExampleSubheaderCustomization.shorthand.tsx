import React from 'react'
import { Header } from '@stardust-ui/react'

const HeaderExampleSubheaderCustomizationShorthand = () => (
  <Header
    as="h2"
    content="Account Settings"
    subheader={{ content: 'Manage your account settings and set email preferences', as: 'span' }}
  />
)

export default HeaderExampleSubheaderCustomizationShorthand
