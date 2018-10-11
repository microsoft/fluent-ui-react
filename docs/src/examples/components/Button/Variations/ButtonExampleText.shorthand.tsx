import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleTextShorthand = () => (
  <div>
    <Button text icon="book" content="Default" iconPosition="before" />
    <Button text type="primary" content="Primary" />
    <Button text content="Secondary" />
    <Button text iconOnly icon="compass outline" />
  </div>
)

export default ButtonExampleTextShorthand
