import React from 'react'
import { Header } from '@stardust-ui/react'

const HeaderExampleDescriptionCustomizationShorthand = () => (
  <Header
    as="h2"
    content="Account Settings"
    description={{
      as: 'span',
      content: 'Manage your account settings and set email preferences',
    }}
  />
)

export default HeaderExampleDescriptionCustomizationShorthand
