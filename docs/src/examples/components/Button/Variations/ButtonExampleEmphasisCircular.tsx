import * as React from 'react'
import { Button, Flex, Icon } from '@stardust-ui/react'

const ButtonExampleEmphasisCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular icon primary>
      <Icon name="coffee" xSpacing="none" />
    </Button>
    <Button circular icon secondary>
      <Icon name="book" xSpacing="none" />
    </Button>
  </Flex>
)

export default ButtonExampleEmphasisCircular
