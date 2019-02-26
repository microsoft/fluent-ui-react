import * as React from 'react'
import { Flex, Grid, Header } from '@stardust-ui/react'

import { Extendable } from 'src/types'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '1.5em',
  color: '#999',
  textTransform: 'uppercase',
}

export type ExampleSectionProps = Extendable<{
  title: string
}>

const ExampleSection: React.FC<ExampleSectionProps> = ({ title, children, ...restProps }) => (
  <Flex column>
    <Flex.Item>
      <>
        <Header as="h2" styles={headerStyle} className="no-anchor">
          {title}
        </Header>
        <Grid variables={{ gridGap: '2rem' }} columns="1">
          {children}
        </Grid>
      </>
    </Flex.Item>
  </Flex>
)

export default ExampleSection
