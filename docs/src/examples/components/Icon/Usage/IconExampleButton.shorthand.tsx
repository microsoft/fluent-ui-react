import React from 'react'
import { Icon, Button, Text } from '@stardust-ui/react'

const IconExampleButton = () => (
  <div>
    <Button type="primary" icon iconPosition="before">
      <Icon name="call" xSpacing="none" />
      <Text content="Call us today" />
    </Button>
  </div>
)

export default IconExampleButton
