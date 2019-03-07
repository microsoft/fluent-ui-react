import * as React from 'react'
import { Label } from '@stardust-ui/react'

const LabelExampleBadgeShorthand = () => (
  <>
    <Label
      content="Badge with icon"
      detail="and additional text"
      icon={{ name: 'emoji', outline: true }}
      iconPosition="start"
      badge
    />
    <br />
    <br />
    <Label
      content="Badge without additional text"
      icon={{ name: 'emoji', outline: true }}
      iconPosition="start"
      badge
    />
    <br />
    <br />
    <Label content="Badge without icon" badge />
  </>
)

export default LabelExampleBadgeShorthand
