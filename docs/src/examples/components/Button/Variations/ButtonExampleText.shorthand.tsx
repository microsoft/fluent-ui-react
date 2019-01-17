import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleTextShorthand = () => (
  <div>
    <Button text icon="book" content="Default" iconPosition="before" />
    <Button text content="Primary" primary />
    <Button text content="Secondary" secondary />
    <Button text iconOnly icon="compass outline" />
  </div>
)

export default ButtonExampleTextShorthand
