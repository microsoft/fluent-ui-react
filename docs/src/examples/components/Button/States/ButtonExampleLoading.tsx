import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const ButtonExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true })

  return (
    <Flex column gap="gap.smaller">
      <Flex gap="gap.smaller">
        <Button loading={loading}>Default</Button>
        <Button loading={loading} primary>
          Primary
        </Button>
        <Button loading={loading} secondary>
          Secondary
        </Button>
        <Button loading={loading} icon="book" iconPosition="before" primary>
          Click me
        </Button>
        <Button loading={loading} circular icon="coffee" />
      </Flex>
      <Button loading={loading} fluid>
        Fluid
      </Button>
    </Flex>
  )
}

export default ButtonExampleLoading
