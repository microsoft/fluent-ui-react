import * as React from 'react'
import * as _ from 'lodash'
import { Header, ProviderConsumer } from '@stardust-ui/react'

const HeaderExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.keys({ ...emphasisColors, ...naturalColors }).map(color => (
        <Header key={color} as="h4" color={color}>
          {_.startCase(color)}
          <Header.Description color={color}>
            {`Description of ${_.lowerCase(color)} color`}
          </Header.Description>
        </Header>
      ))
    }
  />
)

export default HeaderExampleColor
