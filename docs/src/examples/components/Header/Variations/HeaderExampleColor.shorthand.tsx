import * as React from 'react'
import * as _ from 'lodash'
import { Header, ProviderConsumer } from '@stardust-ui/react'

const HeaderExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.keys({ ...emphasisColors, ...naturalColors }).map(color => (
        <Header
          key={color}
          as="h4"
          color={color}
          content={_.startCase(color)}
          description={{ content: `Description of ${_.lowerCase(color)} color`, color }}
        />
      ))
    }
  />
)

export default HeaderExampleColor
