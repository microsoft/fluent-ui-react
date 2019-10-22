import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleEmphasis = () => (
  <Flex
    gap="gap.smaller"
    styles={({ theme: { siteVariables } }) => ({
      backgroundColor: siteVariables.colorScheme.brand.background2,
      padding: '20px',
    })}
  >
    <Button inverted content="inverted" />
  </Flex>
)

export default ButtonExampleEmphasis
