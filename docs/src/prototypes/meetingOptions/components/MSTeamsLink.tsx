import * as React from 'react'
import { Provider, Text } from '@stardust-ui/react'

export default props => {
  const { content, children } = props
  return (
    <Provider.Consumer
      render={({ siteVariables }) => (
        <Text as="a" content={content} styles={{}}>
          {children}
        </Text>
      )}
    />
  )
}
