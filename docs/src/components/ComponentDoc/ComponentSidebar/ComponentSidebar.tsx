import * as _ from 'lodash'
import * as React from 'react'
import { Menu, Segment } from '@stardust-ui/react'

import ComponentSidebarSection from './ComponentSidebarSection'

const sidebarStyle = {
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
  border: 0,
  background: 'none',
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

    const menuItems = _.map(sections, ({ examples, sectionName, index }) => ({
      key: index,
      content: (
        <ComponentSidebarSection
          activePath={activePath}
          examples={examples}
          key={`${sectionName}-${index}`}
          sectionName={sectionName}
          onItemClick={onItemClick}
        />
      ),
    }))

    // TODO: use a Sticky component instead of position:fixed, when available
    return (
      <Segment context={examplesRef} styles={{ padding: 0, position: 'fixed' }}>
        <Menu fluid vertical items={menuItems} styles={{ ...sidebarStyle }} />
      </Segment>
    )
  }
}

export default ComponentSidebar
