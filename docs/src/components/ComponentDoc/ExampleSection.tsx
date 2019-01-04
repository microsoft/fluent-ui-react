import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Segment, Header } from '@stardust-ui/react'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '1.5em',
  color: '#999',
  textTransform: 'uppercase',
}

const ExampleSection: any = ({ title, children, ...rest }) => (
  <Segment>
    <Header as="h2" styles={headerStyle} className="no-anchor">
      {title}
    </Header>
    {children}
  </Segment>
)

ExampleSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default ExampleSection
