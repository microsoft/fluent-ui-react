import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleDisabled = () => (
  <div>
    <Button disabled content="Default" />
    <Button disabled content="Primary" primary />
    <Button disabled content="Secondary" secondary />
    <Button disabled icon="book" content="Click me" iconPosition="before" primary />
    <Button disabled circular icon="coffee" />
    <br />
    <br />
    <Button disabled fluid content="Fluid" />
  </div>
)

export default ButtonExampleDisabled
