import * as React from 'react'
import { Grid, Provider, TextArea } from '@fluentui/react'

const TextAreaExampleInverted = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <TextArea inverted placeholder="Inverted color text area..." />
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
          <TextArea placeholder="Default text area..." />
        </Grid>
      )}
    />
  </div>
)

export default TextAreaExampleInverted
