import * as React from 'react'
import { Provider, Layout } from '@stardust-ui/react'
import { middleColumnStyles } from '../styles'

export default props => {
  return (
    <Provider.Consumer
      render={({ siteVariables }) => {
        return (
          <Layout
            styles={{ backgroundColor: siteVariables.brand }}
            renderMainArea={() => {
              return (
                <div style={{ ...middleColumnStyles, lineHeight: '40px' }}>{props.content}</div>
              )
            }}
          />
        )
      }}
    />
  )
}
