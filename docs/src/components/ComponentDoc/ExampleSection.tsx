import * as React from 'react'
import { Segment, Header } from '@stardust-ui/react'

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
  <Segment>
    <Header as="h2" styles={headerStyle} className="no-anchor">
      {title}
    </Header>
    {children}
  </Segment>
)

export default ExampleSection
