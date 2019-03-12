import * as React from 'react'
import { Flex, Image, Text, Header } from '@stardust-ui/react'

const FlexExampleMediaCard = () => (
  <Flex gap="gap.medium" padding="padding.medium" debug>
    <Flex.Item size="size.medium">
      <div style={{ position: 'relative' }}>
        <Image fluid src="public/images/avatar/large/ade.jpg" />
      </div>
    </Flex.Item>

    <Flex.Item grow>
      <Flex column gap="gap.small" vAlign="stretch">
        <Flex space="between">
          <Header as="h3" content="مرحبا بالعالم" />
          <Text as="pre" content="Oct 24th, 00:01, في الامس" />
        </Flex>

        <Text content="ينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا الواجب والعمل سنتنازل غالباً ونرفض الشعور" />

        <Flex.Item push>
          <Text as="pre" content="حقوق النشر: Stardust-UI Inc." />
        </Flex.Item>
      </Flex>
    </Flex.Item>
  </Flex>
)

export default FlexExampleMediaCard
