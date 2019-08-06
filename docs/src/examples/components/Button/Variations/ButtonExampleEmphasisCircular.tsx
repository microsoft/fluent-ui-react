import * as React from 'react'
import { Button, Flex, Icon } from '@stardust-ui/react'

const ButtonExampleEmphasisCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular icon primary>
      <Icon name="translation" xSpacing="none" />
    </Button>
    <Button circular icon secondary>
      <Icon name="emoji" xSpacing="none" />
    </Button>
  </Flex>
)

export default ButtonExampleEmphasisCircular
