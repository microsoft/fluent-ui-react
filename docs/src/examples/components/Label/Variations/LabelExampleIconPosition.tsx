import React from 'react'
import { Label, Icon } from '@stardust-ui/react'

const LabelExampleIconPosition = () => (
  <Label circular>
    Label with icon after the content
    <Icon name="close" xSpacing="before" variables={() => ({ color: 'rgba(0, 0, 0, 0.6)' })} />
  </Label>
)

export default LabelExampleIconPosition
