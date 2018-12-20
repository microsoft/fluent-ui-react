import * as React from 'react'
import * as _ from 'lodash'
import { Label, ProviderConsumer } from '@stardust-ui/react'

const LabelExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { colorScheme } }) =>
      _.keys(colorScheme).map(color => (
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
