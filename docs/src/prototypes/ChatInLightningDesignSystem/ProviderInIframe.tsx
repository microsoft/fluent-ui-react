import { Provider, ProviderProps } from '@stardust-ui/react'
import * as React from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'

const ProviderInIframe: React.FC<ProviderProps> = props => {
  const { children, ...rest } = props

  return (
    <Frame style={{ width: '100%', minHeight: '100vh' }}>
      <FrameContextConsumer>
        {({ document }) => (
          <Provider overwrite target={document} {...rest}>
            {children}
          </Provider>
        )}
      </FrameContextConsumer>
    </Frame>
  )
}

export default ProviderInIframe
