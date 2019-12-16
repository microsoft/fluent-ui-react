import { Provider, themes } from '@fluentui/react'
import * as React from 'react'

const SandboxApp: React.FunctionComponent = props => {
  const { children } = props

  return (
    <Provider theme={themes.teams} styles={{ height: '100vh', padding: '1rem' }}>
      {children}
    </Provider>
  )
}

export default SandboxApp
