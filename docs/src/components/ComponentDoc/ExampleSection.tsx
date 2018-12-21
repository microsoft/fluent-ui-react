import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Grid, Header } from 'semantic-ui-react'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '1.5em',
  color: '#999',
  textTransform: 'uppercase',
}

const sectionStyle: React.CSSProperties = {
  paddingBottom: '5em',
}

const ExampleSection: any = ({ title, children, ...rest }) => (
  <Grid padded style={sectionStyle} {...rest}>
    <Grid.Column>
      <Header as="h2" style={headerStyle} className="no-anchor">
        {title}
      </Header>
      {children}
    </Grid.Column>
  </Grid>
)

ExampleSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default ExampleSection
