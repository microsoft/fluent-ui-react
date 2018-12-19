import * as React from 'react'
import { Icon, Label } from '@stardust-ui/react'

const IconExampleSpace = () => (
  <div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Default" />
      <Icon name="call-video" />
      <Label content="Default" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Before" />
      <Icon name="call-video" xSpacing="before" />
      <Label content="Before" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="After" />
      <Icon name="call-video" xSpacing="after" />
      <Label content="After" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Both" />
      <Icon name="call-video" xSpacing="both" />
      <Label content="Both" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="None" />
      <Icon name="call-video" xSpacing="none" />
      <Label content="None" />
    </div>
  </div>
)

export default IconExampleSpace
