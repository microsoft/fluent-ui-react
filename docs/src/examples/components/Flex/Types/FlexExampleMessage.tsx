import * as React from 'react'
import { Avatar, Flex, Icon, Text, Divider } from '@stardust-ui/react'

const FlexExampleMessage = () => (
  <>
    <Flex gap="1rem">
      <Avatar image="public/images/avatar/small/matt.jpg" />
      <Flex vertical fluid>
        <Flex baseline gap="1rem">
          <Text important content="John Smith" />
          <Flex.Body>
            <Text content="Yesterday 11:13 AM" size="small" disabled />
          </Flex.Body>
          <Icon name="home" />
        </Flex>
        <Text content="How are you? Hope you are doing well" />
      </Flex>
    </Flex>

    <Divider />

    <Flex center debug gap="12px" style={cardStyle}>
      <Avatar image="public/images/avatar/small/matt.jpg" size={28} />
      <Flex vertical fluid>
        <Flex baseline between>
          <Text weigth="bold" content="Name" style={baseFont} />
          <Text timestamp content="0:00 PM" size="small" style={captionFont} />
        </Flex>
        <Text
          content="Message Preview"
          size="small"
          style={{ fontFamily: 'Caption', lineHeight: 1 }}
        />
      </Flex>
    </Flex>
  </>
)

const cardStyle = { height: '48px', padding: '0 20px', width: '326px' }
const baseFont = { fontFamily: 'Base' }
const captionFont = { fontFamily: 'Caption' }

export default FlexExampleMessage
