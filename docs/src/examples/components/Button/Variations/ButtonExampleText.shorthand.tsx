import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleTextShorthand = () => (
  <div>
    <Button text icon="book" content="Default" iconPosition="before" />
    <Button text type="primary" content="Primary" />
    <Button text type="secondary" content="Secondary" />
    <Button text circular icon="coffee" />
    <br />
    <br />
    <Button text fluid content="Fluid" />
  </div>
)

export default ButtonExampleTextShorthand
