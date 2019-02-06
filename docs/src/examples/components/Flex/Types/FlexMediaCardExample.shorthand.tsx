import * as React from 'react'
import { Flex, Image, Text, Header } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex gap="gap.medium" debug>
      <Flex.Item as="div" size="size.medium">
        <div style={{ position: 'relative' }}>
          <Image fluid src="http://localhost:8080/public/images/avatar/large/helen.jpg" />
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
  </>
)

export default FlexExampleShorthand
