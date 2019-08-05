import {
  CopyToClipboard,
  CodeSnippet,
  KnobInspector,
  KnobProvider,
} from '@stardust-ui/docs-components'
import { Divider, Flex, Menu, Segment, Provider, ICSSInJSStyle } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import * as copyToClipboard from 'copy-to-clipboard'
import SourceRender from 'react-source-render'
import VisibilitySensor from 'react-visibility-sensor'

import { examplePathToHash, getFormattedHash, scrollToAnchor } from 'docs/src/utils'
import { constants } from 'src/lib'
import Editor, { EDITOR_BACKGROUND_COLOR, EDITOR_GUTTER_COLOR } from 'docs/src/components/Editor'
import { babelConfig, importResolver } from 'docs/src/components/Playground/renderConfig'
import ExampleContext, { ExampleContextValue } from 'docs/src/context/ExampleContext'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'
import ComponentSourceManager, {
  ComponentSourceManagerRenderProps,
} from '../ComponentSourceManager'
import { ThemeInput } from 'packages/react/src/themes/types'
import ComponentExampleKnobs from './ComponentExampleKnobs'
import ExamplePlaceholder from '../../ExamplePlaceholder'
import VariableResolver from 'docs/src/components/VariableResolver/VariableResolver'
import ComponentExampleVariables from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleVariables'

export interface ComponentExampleProps
  extends RouteComponentProps<any, any>,
    ComponentSourceManagerRenderProps,
    ExampleContextValue {
  title: React.ReactNode
  description?: React.ReactNode
  examplePath: string
}

interface ComponentExampleState {
  componentVariables: Object
  resolvedVariables: Object
  showCode: boolean
  showRtl: boolean
  showTransparent: boolean
  showVariables: boolean
  wasEverVisible: boolean
}

const childrenStyle: React.CSSProperties = {
  paddingTop: 0,
  paddingBottom: '10px',
}

/**
 * Renders a `component` and the raw `code` that produced it.
 * Allows toggling the the raw `code` code block.
 */
class ComponentExample extends React.Component<ComponentExampleProps, ComponentExampleState> {
  anchorName: string
  kebabExamplePath: string

  constructor(props) {
    super(props)

    const { examplePath } = props

    this.anchorName = examplePathToHash(examplePath)
    this.state = {
      showCode: this.isActiveHash(),
      componentVariables: {},
      resolvedVariables: {},
      showRtl: examplePath && examplePath.endsWith('rtl'),
      showTransparent: false,
      showVariables: false,
      wasEverVisible: false,
    }
  }

  componentWillReceiveProps(nextProps: ComponentExampleProps) {
    // deactivate examples when switching from one to the next
    if (
      this.isActiveHash() &&
      this.isActiveState() &&
      this.props.location.hash !== nextProps.location.hash
    ) {
      this.clearActiveState()
    }
  }

  clearActiveState = () => {
    this.setState({
      showCode: false,
      showRtl: false,
      showVariables: false,
    })
  }

  isActiveState = () => {
    const { showCode, showVariables } = this.state

    return showCode || showVariables
  }

  isActiveHash = () => this.anchorName === getFormattedHash(this.props.location.hash)

  updateHash = () => {
    if (this.isActiveState()) this.setHashAndScroll()
    else if (this.isActiveHash()) this.removeHash()
  }

  setHashAndScroll = () => {
    const { history, location } = this.props

    history.replace(`${location.pathname}#${this.anchorName}`)
    scrollToAnchor()
  }

  removeHash = () => {
    const { history, location } = this.props

    history.replace(location.pathname)

    this.clearActiveState()
  }

  handleDirectLinkClick = () => {
    this.setHashAndScroll()
    copyToClipboard(window.location.href)
  }

  handleShowRtlClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    this.setState(prevState => ({ showRtl: !prevState.showRtl }))
  }

  handleShowCodeClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { showCode } = this.state

    this.setState({ showCode: !showCode }, this.updateHash)
  }

  handleShowVariablesClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { showVariables } = this.state

    this.setState({ showVariables: !showVariables }, this.updateHash)
  }

  handleShowTransparentClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { showTransparent } = this.state

    this.setState({ showTransparent: !showTransparent })
  }

  resetSourceCode = () => {
    if (confirm('Lose your changes?')) {
      this.props.handleCodeReset()
    }
  }

  getKebabExamplePath = () => {
    if (!this.kebabExamplePath) this.kebabExamplePath = _.kebabCase(this.props.examplePath)

    return this.kebabExamplePath
  }

  renderElement = (element: React.ReactElement<any>) => {
    const { showRtl, showTransparent, componentVariables } = this.state
    const newTheme: ThemeInput = {
      componentVariables: {
        ...componentVariables,
        ProviderBox: { background: showTransparent ? 'initial' : undefined },
      },
    }

    return (
      <Provider theme={newTheme} rtl={showRtl}>
        {element}
      </Provider>
    )
  }

  getDisplayName = () => this.props.examplePath.split('/')[1]

  handleCodeApiChange = apiType => () => {
    this.props.handleCodeAPIChange(apiType)
  }

  handleCodeLanguageChange = language => () => {
    const { handleCodeLanguageChange, wasCodeChanged } = this.props

    if (wasCodeChanged) {
      if (confirm('Lose your changes?')) {
        handleCodeLanguageChange(language)
      }
    } else {
      handleCodeLanguageChange(language)
    }
  }

  exampleMenuVariables = siteVars => ({
    backgroundColorActive: 'transparent',
    borderColorActive: siteVars.colors.white,
    colorActive: siteVars.colors.white,
    primaryBorderColor: siteVars.colors.white,
    color: siteVars.colors.white,
  })

  renderAPIsMenu = (): JSX.Element => {
    const { componentAPIs, currentCodeAPI } = this.props
    const menuItems = _.map(componentAPIs, ({ name, supported }, type) => ({
      active: currentCodeAPI === type,
      content: (
        <span>
          {name}
          {!supported && <em> (not supported)</em>}
        </span>
      ),
      disabled: !supported,
      key: type,
      onClick: this.handleCodeApiChange(type),
    }))

    return (
      <Menu
        underlined
        items={menuItems}
        variables={this.exampleMenuVariables}
        styles={{ borderBottom: 0 }}
      />
    )
  }

  renderLanguagesMenu = (): JSX.Element => {
    const { currentCodeLanguage } = this.props
    const menuItems = [
      {
        active: currentCodeLanguage === 'js',
        content: 'JavaScript',
        key: 'js',
        onClick: this.handleCodeLanguageChange('js'),
      },
      {
        active: currentCodeLanguage === 'ts',
        content: 'TypeScript',
        key: 'ts',
        onClick: this.handleCodeLanguageChange('ts'),
      },
    ]

    return (
      <Menu
        underlined
        items={menuItems}
        variables={this.exampleMenuVariables}
        styles={{ borderBottom: 0 }}
      />
    )
  }

  renderCodeEditorMenu = (): JSX.Element => {
    const {
      canCodeBeFormatted,
      currentCode,
      currentCodeLanguage,
      currentCodePath,
      handleCodeFormat,
      wasCodeChanged,
    } = this.props

    const codeEditorStyle: ICSSInJSStyle = {
      position: 'relative',
      margin: '0 0 0 .5rem',
      top: '2px',
      border: '0',
      paddingTop: '.5rem',
      float: 'right',
      borderBottom: 0,
    }

    // get component name from file path:
    // elements/Button/Types/ButtonButtonExample
    const pathParts = currentCodePath.split(__PATH_SEP__)
    const filename = pathParts[pathParts.length - 1]

    const ghEditHref = [
      `${constants.repoURL}/edit/master/docs/src/examples/${currentCodePath}.tsx`,
      `?message=docs(${filename}): your description`,
    ].join('')

    const menuItems = [
      {
        icon: canCodeBeFormatted ? 'magic' : 'check', // (error && 'bug') || (canCodeBeFormatted ? 'magic' : 'check')
        // active: !!error,
        content: 'Prettier',
        key: 'prettier',
        onClick: handleCodeFormat,
        disabled: !canCodeBeFormatted,
      },
      {
        icon: 'refresh',
        content: 'Reset',
        key: 'reset',
        onClick: this.resetSourceCode,
        disabled: !wasCodeChanged,
      },
      render =>
        render({ content: 'Copy' }, (Component, props) => (
          <CopyToClipboard key="copy" value={currentCode}>
            {(active, onClick) => (
              <Component
                {...props}
                active={active}
                icon={active ? 'check' : 'copy'}
                onClick={onClick}
              />
            )}
          </CopyToClipboard>
        )),
      {
        disabled: currentCodeLanguage !== 'ts',
        icon: 'github',
        content: 'Edit',
        href: ghEditHref,
        rel: 'noopener noreferrer',
        target: '_blank',
        title: currentCodeLanguage !== 'ts' ? 'You can edit source only in TypeScript' : undefined,
        key: 'withtslanguage',
      },
    ]

    return (
      <Menu
        primary
        underlined
        activeIndex={-1}
        styles={codeEditorStyle}
        variables={this.exampleMenuVariables}
        items={menuItems}
      />
    )
  }

  renderSourceCode = () => {
    const { currentCode = '', handleCodeChange } = this.props
    const { showCode } = this.state

    const lineCount = currentCode.match(/^/gm)!.length

    return showCode ? (
      // match code editor background and gutter size and colors
      <div style={{ background: EDITOR_BACKGROUND_COLOR } as React.CSSProperties}>
        <div
          style={
            {
              borderLeft: `${lineCount > 9 ? 41 : 34}px solid ${EDITOR_GUTTER_COLOR}`,
              paddingBottom: '2.6rem',
            } as React.CSSProperties
          }
        >
          <Menu styles={{ display: 'flex', justifyContent: 'space-between', border: 'none' }}>
            {this.renderAPIsMenu()}
            {this.renderLanguagesMenu()}
          </Menu>

          {this.renderCodeEditorMenu()}
        </div>

        <Editor value={currentCode} onChange={handleCodeChange} />
      </div>
    ) : null
  }

  handleVariableChange = (componentName: string, variableName: string, variableValue: string) => {
    this.setState(state => ({
      componentVariables: {
        ...state.componentVariables,
        [componentName]: {
          ...state.componentVariables[componentName],
          [variableName]: variableValue,
        },
      },
    }))
  }

  handleVariableResolve = variables => {
    // Remove ProviderBox to hide it in variables
    delete variables['ProviderBox']
    this.setState({ resolvedVariables: variables })
  }

  handleVisibility = (willBeVisible: boolean) => {
    if (willBeVisible && !this.state.wasEverVisible) this.setState({ wasEverVisible: true })
  }

  render() {
    const displayName = this.getDisplayName()

    const {
      children,
      currentCode,
      currentCodeLanguage,
      currentCodePath,
      description,
      title,
    } = this.props
    const {
      componentVariables,
      resolvedVariables,
      showCode,
      showRtl,
      showTransparent,
      showVariables,
      wasEverVisible,
    } = this.state

    return (
      <VisibilitySensor
        delayedCall={!wasEverVisible}
        partialVisibility
        onChange={this.handleVisibility}
      >
        <Flex column>
          <Flex.Item>
            <KnobProvider>
              {/* Ensure anchor links don't occlude card shadow effect */}
              <div id={this.anchorName} style={{ position: 'relative', bottom: '1rem' }} />

              <ExamplePlaceholder visible={wasEverVisible}>
                <Segment styles={{ borderBottom: '1px solid #ddd' }}>
                  <Flex>
                    <ComponentExampleTitle description={description} title={title} />

                    <Flex.Item push>
                      <ComponentControls
                        anchorName={this.anchorName}
                        exampleCode={currentCode}
                        exampleLanguage={currentCodeLanguage}
                        examplePath={currentCodePath}
                        onShowCode={this.handleShowCodeClick}
                        onCopyLink={this.handleDirectLinkClick}
                        onShowRtl={this.handleShowRtlClick}
                        onShowVariables={this.handleShowVariablesClick}
                        onShowTransparent={this.handleShowTransparentClick}
                        showRtl={showRtl}
                      />
                    </Flex.Item>
                  </Flex>

                  <KnobInspector>
                    {knobs => knobs && <ComponentExampleKnobs>{knobs}</ComponentExampleKnobs>}
                  </KnobInspector>
                </Segment>
              </ExamplePlaceholder>

              {children && <Segment styles={childrenStyle}>{children}</Segment>}

              <ExamplePlaceholder visible={wasEverVisible} size="larger">
                <SourceRender
                  babelConfig={babelConfig}
                  source={currentCode}
                  renderHtml={showCode}
                  resolver={importResolver}
                  wrap={this.renderElement}
                  unstable_hot
                >
                  {({ element, error, markup }) => (
                    <>
                      <Segment
                        className={`rendered-example ${this.getKebabExamplePath()}`}
                        styles={{
                          padding: '2rem',
                          ...(showTransparent && {
                            backgroundImage:
                              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
                            backgroundRepeat: 'repeat',
                          }),
                        }}
                      >
                        <VariableResolver onResolve={this.handleVariableResolve}>
                          {element}
                        </VariableResolver>
                      </Segment>
                      <Segment styles={{ padding: 0 }}>
                        {this.renderSourceCode()}
                        {error && (
                          <Segment inverted color="red">
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
                          </Segment>
                        )}
                        {showCode && (
                          <div>
                            <Divider fitted />
                            <CodeSnippet fitted label="Rendered HTML" mode="html" value={markup} />
                          </div>
                        )}
                      </Segment>
                    </>
                  )}
                </SourceRender>

                {showVariables && (
                  <Segment>
                    <ComponentExampleVariables
                      displayName={displayName}
                      onChange={this.handleVariableChange}
                      variables={_.merge(resolvedVariables, componentVariables)}
                    />
                  </Segment>
                )}
              </ExamplePlaceholder>
            </KnobProvider>
          </Flex.Item>
        </Flex>
      </VisibilitySensor>
    )
  }
}

const ComponentExampleWithTheme = props => (
  <ExampleContext.Consumer>
    {exampleProps => (
      <ComponentSourceManager examplePath={props.examplePath}>
        {codeProps => <ComponentExample {...props} {...exampleProps} {...codeProps} />}
      </ComponentSourceManager>
    )}
  </ExampleContext.Consumer>
)

export default withRouter(ComponentExampleWithTheme)
