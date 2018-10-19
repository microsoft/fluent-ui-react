import * as React from 'react'
import { Provider, Divider } from '@stardust-ui/react'
import { green } from './styles'

export default props => {
  return (
    <Provider
      theme={{
        componentVariables: {
          Divider: {
            dividerColor: green,
          },
        },
      }}
    >
      <Divider {...props} />
    </Provider>
  )
}
