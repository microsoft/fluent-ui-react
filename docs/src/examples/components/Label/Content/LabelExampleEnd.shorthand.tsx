import React from 'react'
import { Label, Icon } from '@stardust-ui/react'

const LabelExampleEndShorthand = () => (
  <Label
    content="I have a closing icon"
    end={<Icon name="close" variables={{ color: 'rgba(0, 0, 0, 0.6)' }} xSpacing="both" />}
  />
)

export default LabelExampleEndShorthand
