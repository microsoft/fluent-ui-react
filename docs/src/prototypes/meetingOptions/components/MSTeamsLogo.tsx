import * as React from 'react'
import { Provider, Text, Icon } from '@stardust-ui/react'
import { ShorthandValue } from 'utils'

export interface LogoProps {
  companyName?: string
  icon?: ShorthandValue
  style?: React.CSSProperties
}

class MSTeamsLogo extends React.Component<LogoProps, any> {
  render() {
    const { companyName, icon, style } = this.props
    return (
      <Provider.Consumer
        render={({ siteVariables }) => {
          return (
            <div style={style}>
              {Icon.create(icon, {
                defaultProps: {
                  variables: { color: siteVariables.brand },
                  size: 'largest',
                  xSpacing: 'after',
                  styles: { verticalAlign: 'middle' },
                },
              })}
              <Text
                styles={{ color: siteVariables.white, verticalAlign: 'middle', lineHeight: '40px' }}
              >
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
