import * as React from 'react'
import { Provider } from '@stardust-ui/react'

const theme = { siteVariables: { brand: 'cornflowerblue' } }

const ProviderExampleShorthand = () => (
  <Provider theme={theme}>
    <div>
      <p>
        Use the <code>Provider.Consumer</code> to access the <code>theme</code>:
      </p>

      <Provider.Consumer
        render={theme => (
          <code>
            theme.siteVariables.colors.primary[500] = {theme.siteVariables.colors.primary[500]}
          </code>
        )}
      />
    </div>
  </Provider>
)

export default ProviderExampleShorthand
