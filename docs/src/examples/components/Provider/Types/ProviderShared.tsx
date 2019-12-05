import { Fabric, PrimaryButton } from 'office-ui-fabric-react'
import { Provider } from '@fluentui/react'
import * as React from 'react'

/*
const ProviderShared = () => (
  <Provider.Consumer
    render={(ctx: any) => (
      <div>
        <pre>{JSON.stringify(ctx.theme, null, 2)}</pre>
        <div>
          <Fabric>
            <PrimaryButton text="just a button" />
          </Fabric>
        </div>
      </div>
    )}
  />
)
*/
const ProviderShared = () => (
  <div>
    <Provider.Consumer
      render={theme => <code>theme.siteVariables.brand = {theme.siteVariables.bodyColor}</code>}
    />

    <div>
      <Fabric>
        <PrimaryButton text="just a button" />
      </Fabric>
    </div>
  </div>
)

export default ProviderShared
