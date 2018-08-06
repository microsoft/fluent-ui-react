import React from 'react'
import { Icon, Label } from '@stardust-ui/react'

const IconExampleSpace = () => (
  <div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Default" />
      <Icon name="user" />
      <Label content="Default" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Before" />
      <Icon name="user" xSpacing="before" />
      <Label content="Before" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="After" />
      <Icon name="user" xSpacing="after" />
      <Label content="After" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Both" />
      <Icon name="user" xSpacing="both" />
      <Label content="Both" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="None" />
      <Icon name="user" xSpacing="none" />
      <Label content="None" />
    </div>
  </div>
)

export default IconExampleSpace
