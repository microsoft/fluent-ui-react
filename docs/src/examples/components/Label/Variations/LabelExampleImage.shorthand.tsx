import React from 'react'
import { Label } from '@stardust-ui/react'

const LabelExampleImageShorthand = () => (
  <Label
    circular
    icon="close"
    iconPosition="end"
    content="John Doe"
    image={{ src: 'public/images/avatar/small/matt.jpg', avatar: true }}
  />
)

export default LabelExampleImageShorthand
