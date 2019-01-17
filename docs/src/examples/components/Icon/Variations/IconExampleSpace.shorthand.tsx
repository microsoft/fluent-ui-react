import * as React from 'react'
import { Icon, Label } from '@stardust-ui/react'

const IconExampleSpace = () => (
  <div>
    <p>
      <Label content="Default" />
      <Icon name="call-video" />
      <Label content="Default" />
    </p>
    <p>
      <Label content="Before" />
      <Icon name="call-video" xSpacing="before" />
      <Label content="Before" />
    </p>
    <p>
      <Label content="After" />
      <Icon name="call-video" xSpacing="after" />
      <Label content="After" />
    </p>
    <p>
      <Label content="Both" />
      <Icon name="call-video" xSpacing="both" />
      <Label content="Both" />
    </p>
    <p>
      <Label content="None" />
      <Icon name="call-video" xSpacing="none" />
      <Label content="None" />
    </p>
  </div>
)

export default IconExampleSpace
