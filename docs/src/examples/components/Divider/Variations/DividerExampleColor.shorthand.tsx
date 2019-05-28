import * as _ from 'lodash'
import * as React from 'react'
import { Divider, ProviderConsumer } from '@stardust-ui/react'

const DividerExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.map({ ...emphasisColors, ...naturalColors }, (variants, name) => (
        <Divider key={name} color={name} content={_.startCase(name)} />
      ))
    }
  />
)

export default DividerExampleColor
