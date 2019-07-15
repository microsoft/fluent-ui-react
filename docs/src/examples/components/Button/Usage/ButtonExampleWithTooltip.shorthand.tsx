import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const ButtonExampleWithTooltip = () => (
  <Tooltip
    trigger={<Button content="Button with tooltip" />}
    content="This is an actionable element."
  />
)

export default ButtonExampleWithTooltip
