import React from 'react'
import { Label, Icon } from '@stardust-ui/react'

const LabelExampleStartShorthand = () => (
  <Label
    content="Have a coffee!"
    start={<Icon name="coffee" variables={{ color: 'rgba(0, 0, 0, 0.6)' }} xSpacing="both" />}
  />
)

export default LabelExampleStartShorthand
