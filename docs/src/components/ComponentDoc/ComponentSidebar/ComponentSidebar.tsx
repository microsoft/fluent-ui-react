import * as _ from 'lodash'
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

type ComponentSidebarProps = {
  activePath: string
  displayName: string
  examplesRef: HTMLElement
  onItemClick: (e: React.SyntheticEvent, { examplePath: string }) => void
}

class ComponentSidebar extends React.Component<ComponentSidebarProps, any> {
  state: any = {}

  componentDidMount() {
    this.fetchSections(this.props.displayName)
  }

  componentDidUpdate(prevProps: ComponentSidebarProps) {
    if (this.props.displayName !== prevProps.displayName) {
      this.fetchSections(this.props.displayName)
    }
  }

  fetchSections = (displayName: string) => {
    import(`docs/src/exampleMenus/${displayName}.examples.json`).then(sections => {
      this.setState({ sections: sections.default })
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
