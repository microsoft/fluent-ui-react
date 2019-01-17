import * as React from 'react'
import { Divider, Layout, Provider } from '@stardust-ui/react'

export default props => {
  return (
    <Provider.Consumer
      render={({ siteVariables }) => {
        return (
          <div
            style={{
              position: 'fixed',
              width: 'inherit',
              bottom: '0px',
              background: siteVariables.gray16,
            }}
          >
            <Divider />
            <Layout
              renderMainArea={() => {
                return <div style={{ lineHeight: '40px', margin: '0 auto' }}>{props.content}</div>
              }}
              styles={({ theme }) => ({
                background: theme.siteVariables.chatBackground,
                color: theme.siteVariables.bodyColor,
              })}
            />
          </div>
        )
      }}
    />
  )
}
