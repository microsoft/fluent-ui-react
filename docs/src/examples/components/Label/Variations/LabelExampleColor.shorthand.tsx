import * as React from 'react'
import { Label, Provider } from '@stardust-ui/react'

const LabelExampleColor = () => (
  <Provider.Consumer
    render={({ siteVariables: { colorScheme } }) =>
      Object.keys(colorScheme).map(color => (
        <span key={color}>
          <Label color={color} content={color} />{' '}
        </span>
      ))
    }
  />
)

export default LabelExampleColor
