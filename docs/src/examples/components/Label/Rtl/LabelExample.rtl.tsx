import * as React from 'react'
import { Label } from '@stardust-ui/react'

const LabelExampleRtl = () => (
  <Label
    content="جين دو"
    circular
    image={{ src: 'public/images/avatar/small/matt.jpg', avatar: true }}
    icon={{ name: 'close' }}
  />
)

export default LabelExampleRtl
