import * as React from 'react'
import { Flex as Row, Image, Text, Header } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Row gap={15} debug>
      <Row.Item as="div" size="200px">
        <div style={{ position: 'relative' }}>
          <Image fluid src="http://localhost:8080/public/images/avatar/large/helen.jpg" />
        </div>
      </Row.Item>

      <Row.Item stretch>
        <Row vertical gap={'10px'} vAlign="stretch">
          <Row space="between">
            <Header as="h3" content="LOREM IPSUM" />
            <Text as="pre" content="Oct 24th, 00:01" />
          </Row>

          <Text content="Man braid iPhone locavore hashtag pop-up, roof party forage heirloom chillwave brooklyn yr 8-bit gochujang blog." />

          <Row.Item push>
            <Text as="pre" content="COPYRIGHT: Stardust-UI Inc." />
          </Row.Item>
        </Row>
      </Row.Item>
    </Row>
  </>
)

export default FlexExampleShorthand
