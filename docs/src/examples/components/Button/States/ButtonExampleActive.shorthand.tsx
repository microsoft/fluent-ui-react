import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleActive = () => (
  <div>
    <Button active content="Default" />
    <Button active type="primary" content="Primary" />
    <Button active type="secondary" content="Secondary" />
    <Button active type="primary" icon="book" content="Click me" iconPosition="before" />
    <Button active circular icon="coffee" />
    <br />
    <br />
    <Button active fluid content="Fluid" />
  </div>
)

export default ButtonExampleActive
