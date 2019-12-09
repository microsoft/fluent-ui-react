import * as React from 'react'
import { Flex, Image, Text, Header } from '@fluentui/react'

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
          <Header as="h3" content="LOREM IPSUM" />
          <Text as="pre" content="Oct 24th, 00:01" />
        </Flex>

        <Text content="Man braid iPhone locavore hashtag pop-up, roof party forage heirloom chillwave brooklyn yr 8-bit gochujang blog." />

        <Flex.Item push>
          <Text as="pre" content="COPYRIGHT: Stardust-UI Inc." />
        </Flex.Item>
      </Flex>
    </Flex.Item>
  </Flex>
)

export default FlexExampleMediaCard
