import * as React from 'react'
import { Grid, Provider, Header, Input, createVariant, InputProps } from '@stardust-ui/react'

const VariantSetExampleShorthand = () => (
  <Provider.Consumer
    render={theme => (
      <>
        <div>
          <Grid columns={3} styles={{ textAlign: 'left' }}>
            {Object.keys(theme.componentVariants.Input).map(variantName => {
              // this type fully supports the same set of props as original Input
              const InputVariant = createVariant<InputProps, {}>(
                Input,
                variantName,
                {}, // prop types
                { icon: 'book' }, // default props
              )

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
