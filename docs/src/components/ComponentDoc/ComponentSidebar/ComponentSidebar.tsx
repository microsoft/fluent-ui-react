import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Accordion, Menu, Sticky } from 'semantic-ui-react'

import ComponentSidebarSection from './ComponentSidebarSection'

const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

class ComponentSidebar extends React.Component<any, any> {
  static propTypes = {
    activePath: PropTypes.string,
    displayName: PropTypes.string,
    examplesRef: PropTypes.object,
    onItemClick: PropTypes.func,
  }

  state: any = {}

  componentDidMount() {
    this.fetchSections()
  }

  componentWillReceiveProps(nextProps) {
    this.fetchSections(nextProps)
  }

  fetchSections = ({ displayName } = this.props) => {
    import(`docs/src/exampleMenus/${displayName}.examples.json`).then(sections => {
      this.setState({ sections })
    })
  }

  render() {
    const { activePath, examplesRef, onItemClick } = this.props
    const { sections } = this.state

    return (
      <Sticky context={examplesRef} offset={15}>
        <Menu as={Accordion} fluid style={sidebarStyle} text vertical>
          {_.map(sections, ({ examples, sectionName }, index) => (
            <ComponentSidebarSection
              activePath={activePath}
              examples={examples}
              key={`${sectionName}-${index}`}
              sectionName={sectionName}
              onItemClick={onItemClick}
            />
          ))}
        </Menu>
      </Sticky>
    )
  }
}

export default ComponentSidebar
