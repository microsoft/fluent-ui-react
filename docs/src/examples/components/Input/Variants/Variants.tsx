import * as React from 'react'
import { Grid, Provider, Header, Input } from '@stardust-ui/react'

const VariantSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <>
        <div>
          <Grid columns={3} styles={{ textAlign: 'left' }}>
            {Object.keys(theme.componentVariants.Input).map(variantName => {
              // const InputVariant = variantOf(Input, variantName)
              return (
                <div key={variantName}>
                  <Header as="h3" content={variantName} />
                  <Input variant={variantName} placeholder="Search..." />
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
