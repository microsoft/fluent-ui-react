import * as React from 'react'
import { Provider, Text, Icon } from '@stardust-ui/react'
import { ItemShorthand } from '../../../../../types/utils'

export interface ILogoProps {
  companyName?: string
  icon?: ItemShorthand
  style?: React.CSSProperties
}

class MSTeamsLogo extends React.Component<ILogoProps, any> {
  render() {
    const { companyName, icon, style } = this.props
    return (
      <Provider.Consumer
        render={({ siteVariables }) => {
          return (
            <div style={{ lineHeight: '40px', ...style }}>
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
            </div>
          )
        }}
      />
    )
  }
}

export default MSTeamsLogo
