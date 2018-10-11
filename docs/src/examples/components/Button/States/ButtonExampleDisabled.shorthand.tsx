import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleDisabled = () => (
  <div>
    <Button disabled content="Default" />
    <Button disabled type="primary" content="Primary" />
    <Button disabled type="primary" icon="book" content="Click me" iconPosition="before" />
    <Button disabled circular icon="coffee" />
    <br />
    <br />
    <Button disabled fluid content="Fluid" />
  </div>
)

export default ButtonExampleDisabled
