import * as React from 'react'
import { Provider, Divider } from '@stardust-ui/react'

export default props => {
  return (
    <Provider
      theme={{
        componentVariables: {
          Divider: {
            dividerColor: '#56b36d',
          },
        },
      }}
    >
      <Divider {...props} />
    </Provider>
  )
}
