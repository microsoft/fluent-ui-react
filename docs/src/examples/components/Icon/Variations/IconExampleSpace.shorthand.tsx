import React from 'react'
import { Icon, Label } from '@stardust-ui/react'

const IconExampleSpace = () => (
  <div>
    <Label content="Default" />
    <Icon name="help" />
    <Label content="None" />
    <Icon xSpacing="none" name="help" />
    <Label content="Before" />
    <Icon xSpacing="before" name="help" />
    <Label content="After" />
    <Icon xSpacing="before" name="help" />
    <Label content="Both" />
    <Icon xSpacing="both" name="help" />
    <Label content="End" />
  </div>
)

export default IconExampleSpace
