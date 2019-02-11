import * as _ from 'lodash'
import * as React from 'react'
import { Menu, Segment } from '@stardust-ui/react'

import ComponentSidebarSection from './ComponentSidebarSection'
// mport { ShorthandValue } from 'src/types';

const sidebarStyle = {
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

    return (
      <Segment context={examplesRef} offset={15}>
        <Menu fluid styles={{ ...sidebarStyle }} vertical items={menuItems} />
      </Segment>
    )
  }
}

export default ComponentSidebar
