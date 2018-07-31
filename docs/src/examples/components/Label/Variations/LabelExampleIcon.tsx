import React from 'react'
import { Label, Icon } from '@stardust-ui/react'

const LabelExampleIcon = () => (
  <Label>
    <Icon name="coffee" xSpacing="after" variables={() => ({ color: 'rgba(0, 0, 0, 0.6' })} />Label
    with icon
  </Label>
)

export default LabelExampleIcon
