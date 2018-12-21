import * as React from 'react'
import * as _ from 'lodash'
import { Text, ProviderConsumer } from '@stardust-ui/react'

const TextExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.keys({ ...emphasisColors, ...naturalColors }).map(color => (
        <>
          <Text key={color} color={color} content={_.startCase(color)} />
          <br />
        </>
      ))
    }
  />
)

export default TextExampleColor
