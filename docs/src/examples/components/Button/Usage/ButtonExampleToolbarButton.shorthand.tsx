import * as React from 'react'
import { Button } from '@stardust-ui/react'

const ButtonExampleToolbarButton = () => (
  <Button
    icon={{
      name: 'bold',
      size: 'big',
    }}
    iconOnly
    text
    styles={{
      '&:hover .ui-icon__filled': {
        display: 'block',
      },
    }}
    variables={siteVariables => ({
      textColor: siteVariables.gray02,
      textColorHover: siteVariables.brand06, // or just brand?
    })}
  />
)

export default ButtonExampleToolbarButton
