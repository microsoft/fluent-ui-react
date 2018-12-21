import * as React from 'react'
import { Header } from '@stardust-ui/react'

const HeaderExampleDescriptionCustomization = () => (
  <Header as="h2">
    Account Settings
    <Header.Description as="span">
      Manage your account settings and set email preferences
    </Header.Description>
  </Header>
)

export default HeaderExampleDescriptionCustomization
