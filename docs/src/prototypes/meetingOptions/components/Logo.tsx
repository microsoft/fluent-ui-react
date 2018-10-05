import * as React from 'react'
import { Provider, Text, Icon } from '@stardust-ui/react'
import { ItemShorthand } from '../../../../../types/utils'

export interface ILogoProps {
  companyName?: string
  icon?: ItemShorthand
}

class Logo extends React.Component<ILogoProps, any> {
  render() {
    const { companyName, icon } = this.props
    return (
      <Provider.Consumer
        render={({ siteVariables }) => {
          return (
            <>
              {Icon.create(icon, {
                defaultProps: {
                  variables: { color: siteVariables.white },
                  size: 'big',
                  xSpacing: 'after',
                  styles: { verticalAlign: 'middle' },
                },
              })}
              <Text styles={{ color: siteVariables.white, verticalAlign: 'middle' }}>
                {companyName}
              </Text>
            </>
          )
        }}
      />
    )
  }
}

export default Logo
