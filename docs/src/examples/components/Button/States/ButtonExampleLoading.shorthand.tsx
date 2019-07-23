import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const ButtonExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true })

  return (
    <Flex column gap="gap.smaller">
      <Flex gap="gap.smaller">
        <Button loading={loading} content="Default" />
        <Button loading={loading} content="Primary" primary />
        <Button loading={loading} content="Secondary" secondary />
        <Button loading={loading} icon="book" content="Click me" iconPosition="before" primary />
        <Button loading={loading} circular icon="coffee" />
      </Flex>
      <Button loading={loading} fluid content="Fluid" />
    </Flex>
  )
}

export default ButtonExampleLoading
