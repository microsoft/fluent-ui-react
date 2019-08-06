import * as React from 'react'
import { Button, Flex, Icon, Text } from '@stardust-ui/react'

const ButtonExampleText = () => (
  <Flex gap="gap.smaller">
    <Button text>
      <Icon name="emoji" xSpacing="after" />
      <Text content="Default" />
    </Button>
    <Button text primary>
      Primary
    </Button>
    <Button text secondary>
      Secondary
    </Button>
    <Button text circular>
      <Icon name="star" xSpacing="none" />
    </Button>
  </Flex>
)

export default ButtonExampleText
