import React from 'react'
import _ from 'lodash'
import { Label, ProviderConsumer } from '@stardust-ui/react'

const LabelExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.keys({ ...emphasisColors, ...naturalColors }).map(color => (
        <>
          <Label key={color} color={color} content={_.startCase(color)} />
          <br />
          <br />
        </>
      ))
    }
  />
)

export default LabelExampleColor
