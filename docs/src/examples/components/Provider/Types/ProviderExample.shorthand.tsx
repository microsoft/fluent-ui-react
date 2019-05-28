import * as React from 'react'
import { Provider } from '@stardust-ui/react'

const customTheme = { siteVariables: { brand: 'cornflowerblue' } }

const ProviderExampleShorthand = () => (
  <Provider theme={customTheme}>
    <div>
      <p>
        Use the <code>Provider.Consumer</code> to access the <code>theme</code>:
      </p>

      <Provider.Consumer
        render={({ siteVariables }) => (
          <code>theme.siteVariables.brand = {siteVariables.brand}</code>
        )}
      />
    </div>
  </Provider>
)

export default ProviderExampleShorthand
