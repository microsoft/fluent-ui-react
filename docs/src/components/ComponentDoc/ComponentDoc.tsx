import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router'
import { Grid, Header, Icon, ICSSInJSStyle, Dropdown, themes } from '@stardust-ui/react'

import componentInfoShape from 'docs/src/utils/componentInfoShape'
import { scrollToAnchor, examplePathToHash, getFormattedHash } from 'docs/src/utils'
import ComponentDocLinks from './ComponentDocLinks'
import ComponentDocSee from './ComponentDocSee'
import ComponentExamples from './ComponentExamples'
import ComponentProps from './ComponentProps'
// import ComponentSidebar from './ComponentSidebar'
import ComponentAccessibility from './ComponentDocAccessibility'
import { ThemeContext } from 'docs/src/context/ThemeContext'
// import ExampleContext from 'docs/src/context/ExampleContext'

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
    //   const { activePath, examplesRef } = this.state

    const topPart = [
      <Header content={info.displayName} description={_.join(info.docblock.description, ' ')} />,
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <Dropdown
            getA11yStatusMessage={getA11yStatusMessage}
            getA11ySelectionMessage={getA11ySelectionMessage}
            noResultsMessage="We couldn't find any matches."
            placeholder="Theme"
            onSelectedChange={changeTheme}
            items={this.getThemeOptions().map(o => o.text)}
          />
        )}
      </ThemeContext.Consumer>,
      <ComponentDocLinks
        displayName={info.displayName}
        parentDisplayName={info.parentDisplayName}
        repoPath={info.repoPath}
        type={info.type}
      />,
    ]

    const gridStyle: ICSSInJSStyle = {
      justifyContent: 'space-between',
    }

    return (
      <DocumentTitle title={`${info.displayName} | Stardust`}>
        <div>
          <Grid rows="1" content={topPart} styles={gridStyle} />
          <ComponentAccessibility info={info} />
          <ComponentDocSee displayName={info.displayName} />
          <ComponentProps displayName={info.displayName} props={info.props} />

          <div ref={this.handleExamplesRef}>
            <ComponentExamples displayName={info.displayName} />
          </div>

          <div style={exampleEndStyle}>
            This is the bottom <Icon name="pointing down" />
          </div>
          {/* <ComponentSidebar
            activePath={activePath}
            displayName={info.displayName}
            examplesRef={examplesRef}
            onItemClick={this.handleSidebarItemClick}
          /> */}
        </div>
      </DocumentTitle>
    )
    /*
        <Grid>
          <Grid.Row style={topRowStyle}>
            <Grid.Column>
              <Header as="h1" content={info.displayName} variables={{ color: 'black' }} />
              <p>{_.join(info.docblock.description, ' ')}</p>
              <ComponentAccessibility info={info} />
              <ComponentDocSee displayName={info.displayName} />
              <ComponentDocLinks
                displayName={info.displayName}
                parentDisplayName={info.parentDisplayName}
                repoPath={info.repoPath}
                type={info.type}
              />
              <ComponentProps displayName={info.displayName} props={info.props} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="equal">
            <Grid.Column style={{ padding: '0 0 0 28px' } as React.CSSProperties}>
              <div ref={this.handleExamplesRef}>
                <ExampleContext.Provider
                  value={{
                    activeAnchorName: activePath,
                    onExamplePassed: this.handleExamplePassed,
                  }}
                >
                  <ComponentExamples displayName={info.displayName} />
                </ExampleContext.Provider>
              </div>
              <div style={exampleEndStyle}>
                This is the bottom <Icon name="pointing down" />
              </div>
            </Grid.Column>
            <Grid.Column computer={5} largeScreen={4} widescreen={4}>
              <ComponentSidebar
                activePath={activePath}
                displayName={info.displayName}
                examplesRef={examplesRef}
                onItemClick={this.handleSidebarItemClick}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
*/
  }

  private getThemeOptions = () => {
    return Object.keys(themes).map(key => ({
      text: _.startCase(key),
      value: key,
    }))
  }
}

export default withRouter(ComponentDoc)
