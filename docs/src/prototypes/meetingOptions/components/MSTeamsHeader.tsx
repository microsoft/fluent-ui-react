import * as React from 'react'
import { Provider } from '@stardust-ui/react'
import { middleColumnStyles } from '../styles'

export default props => {
  return (
    <Provider.Consumer
      render={({ siteVariables }) => {
        return (
          <div style={{ backgroundColor: siteVariables.brand }}>
            <div style={{ ...middleColumnStyles }}>{props.content}</div>
          </div>
        )
      }}
    />
  )
}
