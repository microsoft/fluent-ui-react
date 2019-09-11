import * as React from 'react'
import { Grid } from '@stardust-ui/react'

const gridStyle: React.CSSProperties = {
  marginTop: '1.5em',
}

// minmax = prevent example overflow - https://stackoverflow.com/a/43312314
const ExampleSection: React.FC = ({ children }) => (
  <>
    <Grid styles={gridStyle} variables={{ gridGap: '2rem' }} columns="minmax(550px, 1fr)">
      {children}
    </Grid>
  </>
)

export default ExampleSection
