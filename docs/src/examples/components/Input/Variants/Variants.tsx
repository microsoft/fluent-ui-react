import * as React from 'react'
import { Input, variantOf, Grid, Provider, Header } from '@stardust-ui/react'

const VariantSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <>
        <div>
          <Grid columns={2} styles={{ textAlign: 'center' }}>
            {Object.keys(theme.componentVariants.Input).map(variantName => {
              const InputVariant = variantOf(Input, variantName)
              return (
                <div key={variantName}>
                  <Header as="h3" content={variantName} />
                  <InputVariant placeholder="Search..." />
                </div>
              )
            })}
          </Grid>
        </div>
      </>
    )}
  />
)

export default VariantSetExampleShorthand
