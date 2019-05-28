import * as React from 'react'
import { Label, Provider } from '@stardust-ui/react'
import * as _ from 'lodash'

const LabelExampleColor = () => (
  <Provider.Consumer
    render={({ siteVariables: { primitiveColors, emphasisColors, naturalColors } }) =>
      _.keys({ ...primitiveColors, ...emphasisColors, ...naturalColors }).map(color => (
        <span key={color}>
          <Label color={color} content={color} />{' '}
        </span>
      ))
    }
  />
)

export default LabelExampleColor
