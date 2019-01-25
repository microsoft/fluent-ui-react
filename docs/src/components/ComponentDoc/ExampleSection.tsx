import * as React from 'react'
import { Box, Grid, Header } from '@stardust-ui/react'

import { Extendable } from 'types/utils'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '1.5em',
  color: '#999',
  textTransform: 'uppercase',
}

/*const sectionStyle: React.CSSProperties = {
  paddingBottom: '5em',
}*/

export type ExampleSectionProps = Extendable<{
  title: string
}>

const ExampleSection: React.FC<ExampleSectionProps> = ({ title, children, ...restProps }) => (
  <Box>
    <Header as="h2" styles={headerStyle} className="no-anchor">
      {title}
    </Header>
    <Grid styles={{ gridRowGap: '20px' }} columns="1">
      {children}
    </Grid>
  </Box>
)

export default ExampleSection
