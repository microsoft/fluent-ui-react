import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { withRouter } from 'react-router'
import { Flex, Header, Icon, Dropdown, Text, Grid } from '@stardust-ui/react'

import componentInfoShape from 'docs/src/utils/componentInfoShape'
import { scrollToAnchor, examplePathToHash, getFormattedHash } from 'docs/src/utils'
import ComponentDocLinks from './ComponentDocLinks'
import ComponentDocSee from './ComponentDocSee'
import ComponentExamples from './ComponentExamples'
import ComponentProps from './ComponentProps'
import ComponentAccessibility from './ComponentDocAccessibility'
import { ThemeContext } from 'docs/src/context/ThemeContext'
import ExampleContext from 'docs/src/context/ExampleContext'
import ComponentPlayground from 'docs/src/components/ComponentPlayground'

const exampleEndStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.5,
  paddingTop: '75vh',
}

class ComponentDoc extends React.Component<any, any> {
  static propTypes = {
    history: PropTypes.object.isRequired,
    info: componentInfoShape.isRequired,
  }

  state: any = {}

  componentWillMount() {
    const { history, location } = this.props

    if (location.hash) {
      const activePath = getFormattedHash(location.hash)
      history.replace(`${location.pathname}#${activePath}`)
      this.setState({ activePath })
    }
  }

  componentWillReceiveProps({ info }) {
    if (info.displayName !== this.props.info.displayName) {
      this.setState({ activePath: undefined })
    }
  }

  handleExamplePassed = (passedAnchorName: string) => {
    this.setState({ activePath: passedAnchorName })
  }

  handleExamplesRef = examplesRef => this.setState({ examplesRef })

  handleSidebarItemClick = (e, { examplePath }) => {
    const { history, location } = this.props
    const activePath = examplePathToHash(examplePath)

    history.replace(`${location.pathname}#${activePath}`)
    // set active hash path
    this.setState({ activePath }, scrollToAnchor)
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

    const { info } = this.props
    const { activePath } = this.state

    return (
      <div style={{ padding: '20px' }}>
        <Flex column>
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
                    aria-level="2"
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
              <Text
                styles={{ marginBottom: '1.4rem' }}
                content={_.join(info.docblock.description, ' ')}
              />
              <ComponentAccessibility info={info} />
              <ComponentDocSee displayName={info.displayName} />

              <ComponentProps displayName={info.displayName} props={info.props} />
            </>
          </Flex.Item>
        </Flex>

        <ComponentPlayground componentName={info.displayName} key={info.displayName} />

        <Grid columns="auto 300px" styles={{ justifyContent: 'normal', justifyItems: 'stretch' }}>
          <div ref={this.handleExamplesRef}>
            <ExampleContext.Provider
              value={{
                activeAnchorName: activePath,
                onExamplePassed: this.handleExamplePassed,
              }}
            >
              <ComponentExamples displayName={info.displayName} />
            </ExampleContext.Provider>

            <div style={exampleEndStyle}>
              This is the bottom <Icon name="pointing down" />
            </div>
          </div>

          {/* TODO: bring back the right floating menu
            <Box styles={{ width: '25%', paddingLeft: '14px' }}>
              <ComponentSidebar
                activePath={activePath}
                displayName={info.displayName}
                examplesRef={examplesRef}
                onItemClick={this.handleSidebarItemClick}
              />
            </Box>
          */}
        </Grid>
      </div>
    )
  }
}

export default withRouter(ComponentDoc)
