import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <div>
    <Button icon="book" content="Click me before" iconPosition="before" primary />
    <Button icon="coffee" content="Click me after" iconPosition="after" secondary />
  </div>
)

export default ButtonExampleContentAndIcon
