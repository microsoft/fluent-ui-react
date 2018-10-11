import React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleContentAndIcon = () => (
  <div>
    <Button type="primary" icon="book" content="Click me before" iconPosition="before" />
    <Button icon="coffee" content="Click me after" iconPosition="after" />
  </div>
)

export default ButtonExampleContentAndIcon
