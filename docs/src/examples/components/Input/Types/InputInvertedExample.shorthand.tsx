import * as React from 'react'
import { Grid, Input, Provider } from '@fluentui/react'

const InputExample = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <Input inverted placeholder="Inverted color input..." />
    </Grid>
    {/* TODO: figure this out - changed because of restricting props styles to be only object :\ */}
    <Provider.Consumer
      render={theme => (
        <Grid
          styles={{
            backgroundColor: theme.siteVariables.colorScheme.default.background,
            padding: '20px',
          }}
        >
          <Input placeholder="Default input..." />
        </Grid>
      )}
    />
  </div>
)

export default InputExample
