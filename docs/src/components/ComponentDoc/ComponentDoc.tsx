import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Flex, Header, Icon, Dropdown, Text, Grid, Menu, Box } from '@stardust-ui/react'

import { getFormattedHash } from 'docs/src/utils'
import ComponentDocLinks from './ComponentDocLinks'
import ComponentDocSee from './ComponentDocSee'
import { ComponentExamples } from './ComponentExamples'
import ComponentProps from './ComponentProps'
import { ComponentDocAccessibility } from './ComponentDocAccessibility'
import { ThemeContext } from 'docs/src/context/ThemeContext'
import ExampleContext from 'docs/src/context/ExampleContext'
import ComponentPlayground from 'docs/src/components/ComponentPlayground/ComponentPlayground'
import { ComponentInfo } from 'docs/src/types'
import ComponentBestPractices from './ComponentBestPractices'
import { tabListBehavior } from 'src/lib/accessibility'
import * as _ from 'lodash'

const exampleEndStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.5,
  paddingTop: '75vh',
}

type ComponentDocProps = {
  info: ComponentInfo
  tabs: string[]
} & RouteComponentProps<{}>

type ComponentDocState = {
  activePath: string
  currentTabIndex: number
}

class ComponentDoc extends React.Component<ComponentDocProps, ComponentDocState> {
  state = {
    activePath: '',
    propComponent: '',
    currentTabIndex: 0,
  }

  tabRegex = new RegExp(/[^\/]*$/)

  getTabIndexOrRedirectToDefault(tab: string, tabs) {
    const lowercaseTabs = _.map(tabs, tab => tab.toLowerCase())
    const index = lowercaseTabs.indexOf(tab)
    if (index === -1) {
      const { history, location } = this.props
      const at = location.pathname
      const newLocation = at.replace(this.tabRegex, 'definition')
      history.push(newLocation)
      return 0
    }
    return index
  }

  getCurrentTabTitle() {
    return this.props.tabs[this.state.currentTabIndex]
  }

  componentWillMount() {
    const { history, location, tabs } = this.props
    const tab = location.pathname.match(this.tabRegex)[0]
    const tabIndex = this.getTabIndexOrRedirectToDefault(tab, tabs)
    this.setState({ currentTabIndex: tabIndex })

    if (location.hash) {
      const activePath = getFormattedHash(location.hash)
      history.replace({ ...history.location, hash: activePath })
      this.setState({ activePath })
    }
  }

  componentWillReceiveProps({ info, location, tabs }) {
    const tab = location.pathname.match(this.tabRegex)[0]
    const tabIndex = this.getTabIndexOrRedirectToDefault(tab, tabs)
    this.setState({ currentTabIndex: tabIndex })

    if (info.displayName !== this.props.info.displayName) {
      this.setState({ activePath: undefined })
    }
  }

  handleExamplePassed = (passedAnchorName: string) => {
    this.setState({ activePath: passedAnchorName })
  }

  /* TODO: bring back the right floating menu
  handleSidebarItemClick = (e, { examplePath }) => {
    const { history } = this.props
    const activePath = examplePathToHash(examplePath)

    history.replace({ ...history.location, hash: activePath })
    // set active hash path
    this.setState({ activePath }, scrollToAnchor)
  }
  */

  handleTabClick = (e, props) => {
    const newIndex = props.index
    const { history, location } = this.props
    const at = location.pathname
    const newLocation = at.replace(this.tabRegex, this.props.tabs[newIndex].toLowerCase())

    history.push(newLocation)
    this.setState({ currentTabIndex: newIndex })
  }

  render() {
    const getA11ySelectionMessage = {
      onAdd: item => `${item} has been selected.`,
      onRemove: item => `${item} has been removed.`,
    }

    const getA11yStatusMessage = ({
      isOpen,
      itemToString,
      previousResultCount,
      resultCount,
      selectedItem,
    }) => {
      if (!isOpen) {
        return selectedItem ? itemToString(selectedItem) : ''
      }
      if (!resultCount) {
        return 'No results are available.'
      }
      if (resultCount !== previousResultCount) {
        return `${resultCount} result${
          resultCount === 1 ? ' is' : 's are'
        } available, use up and down arrow keys to navigate. Press Enter key to select.`
      }
      return ''
    }

    const { info, tabs } = this.props
    const { activePath, currentTabIndex } = this.state

    return (
      <div style={{ padding: '20px' }}>
        <Flex column styles={{ paddingBottom: '1rem' }}>
          <Flex.Item padding="padding.medium">
            <ThemeContext.Consumer>
              {({ changeTheme, themeOptions }) => (
                <Dropdown
                  getA11yStatusMessage={getA11yStatusMessage}
                  getA11ySelectionMessage={getA11ySelectionMessage}
                  noResultsMessage="We couldn't find any matches."
                  placeholder="Theme"
                  onSelectedChange={changeTheme}
                  items={themeOptions.map(({ text, value }) => ({ header: text, value }))}
                />
              )}
            </ThemeContext.Consumer>
          </Flex.Item>
          <Flex.Item>
            <>
              <Flex styles={{ justifyContent: 'space-between' }}>
                <Flex.Item>
                  <Header
                    as="h1"
                    aria-level={2}
                    content={info.displayName}
                    variables={{ color: 'black' }}
                  />
                </Flex.Item>
                <Flex.Item>
                  <ComponentDocLinks
                    displayName={info.displayName}
                    parentDisplayName={info.parentDisplayName}
                    repoPath={info.repoPath}
                    type={info.type}
                  />
                </Flex.Item>
              </Flex>
              <Menu
                underlined
                primary
                activeIndex={currentTabIndex}
                items={tabs}
                onItemClick={this.handleTabClick}
                accessibility={tabListBehavior}
              />
              <ComponentDocSee displayName={info.displayName} />
            </>
          </Flex.Item>
        </Flex>

        {this.getCurrentTabTitle() === 'Accessibility' && <ComponentDocAccessibility info={info} />}

        {this.getCurrentTabTitle() === 'Props' && (
          <ComponentProps displayName={info.displayName} props={info.props} />
        )}

        {this.getCurrentTabTitle() === 'Definition' && (
          <>
            <Text
              size="large"
              styles={{ marginBottom: '1.4rem' }}
              content={info.docblock.description}
            />
            <Box styles={{ height: '10px' }} />
            <ComponentPlayground componentName={info.displayName} key={info.displayName} />
            <Grid
              columns="auto 300px"
              styles={{ justifyContent: 'normal', justifyItems: 'stretch' }}
            >
              <div>
                <ComponentBestPractices displayName={info.displayName} />
                <ExampleContext.Provider
                  value={{
                    activeAnchorName: activePath,
                    onExamplePassed: this.handleExamplePassed,
                  }}
                >
                  <ComponentExamples displayName={info.displayName} />
                </ExampleContext.Provider>
              </div>
            </Grid>
          </>
        )}

        <div style={exampleEndStyle}>
          This is the bottom <Icon name="pointing down" />
        </div>
      </div>
    )
  }
}

export default withRouter(ComponentDoc)
