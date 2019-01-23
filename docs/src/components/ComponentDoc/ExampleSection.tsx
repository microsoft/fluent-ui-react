import * as React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import { Extendable } from 'types/utils'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '1.5em',
  color: '#999',
  textTransform: 'uppercase',
}

const sectionStyle: React.CSSProperties = {
  paddingBottom: '5em',
}

export type ExampleSectionProps = Extendable<{
  title: string
}>

const ExampleSection: React.FC<ExampleSectionProps> = ({ title, children, ...restProps }) => (
  <Grid padded style={sectionStyle} {...restProps}>
    <Grid.Column>
      <Header as="h2" style={headerStyle} className="no-anchor">
        {title}
      </Header>
      {children}
    </Grid.Column>
  </Grid>
)

export default ExampleSection
