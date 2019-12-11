import * as React from 'react'
import { Button, Flex } from '@fluentui/react'

const ButtonExampleSecondaryAlt = () => (
  <Flex
    gap="gap.smaller"
    styles={({ theme: { siteVariables } }) => ({
      backgroundColor: siteVariables.colorScheme.brand.background2,
      padding: '20px',
    })}
  >
    <Button secondaryAlt content="Secondary Alt" />
  </Flex>
)

export default ButtonExampleSecondaryAlt
