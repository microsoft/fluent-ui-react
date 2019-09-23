import { knobComponents, KnobsSnippet } from '@stardust-ui/code-sandbox'
import {
  CopyToClipboard,
  KnobInspector,
  KnobProvider,
  LogInspector,
} from '@stardust-ui/docs-components'
import { Flex, ICSSInJSStyle, Menu, Provider, Segment } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import * as copyToClipboard from 'copy-to-clipboard'
import qs from 'qs'
import SourceRender from 'react-source-render'

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
import VariableResolver from 'docs/src/components/VariableResolver/VariableResolver'
import ComponentExampleVariables from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleVariables'

const ERROR_COLOR = '#D34'

export interface ComponentExampleProps
  extends RouteComponentProps<any, any>,
    ComponentSourceManagerRenderProps,
    ExampleContextValue {
  title: React.ReactNode
  description?: React.ReactNode
  examplePath: string
}

interface ComponentExampleState {
  anchorName: string
  componentVariables: Object
  isActive: boolean
  isActiveHash: boolean
  usedVariables: Record<string, string[]>
  showCode: boolean
  showRtl: boolean
  showTransparent: boolean
  showVariables: boolean
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
  kebabExamplePath: string

  static getClearedActiveState = () => ({
    showCode: false,
    showRtl: false,
    showVariables: false,
    showTransparent: false,
  })

  static getAnchorName = props => examplePathToHash(props.examplePath)

  static isActiveHash = props => {
    const anchorName = ComponentExample.getAnchorName(props)
    const formattedHash = getFormattedHash(props.location.hash)

    return anchorName === formattedHash
  }

  static getStateFromURL = props => {
    return qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
      decoder: (raw, parse) => {
        const result = parse(raw)
        return result === 'false' ? false : result === 'true' ? true : result
      },
    })
  }

  static setStateToURL = (props, state) => {
    const nextQueryState = {
      showCode: state.showCode,
      showRtl: state.showRtl,
      showTransparent: state.showTransparent,
      showVariables: state.showVariables,
    }

    const prevQueryState = ComponentExample.getStateFromURL(props)

    // don't trigger re-renders if the state in the query string is the same as the state
    // that is trying to be set
    if (_.isEqual(prevQueryState, nextQueryState)) {
      return
    }

    const nextQueryString = qs.stringify(nextQueryState)

    props.history.replace({ ...props.history.location, search: `?${nextQueryString}` })
  }

  static getDerivedStateFromProps(props, state) {
    const anchorName = ComponentExample.getAnchorName(props)
    const isActiveHash = ComponentExample.isActiveHash(props)
    const isActive = !!state.showCode || !!state.showVariables
    const nextHash = props.location.hash !== state.prevHash ? props.location.hash : state.prevHash

    const nextState = {
      anchorName,
      isActive,
      isActiveHash,
      prevHash: nextHash,
    }

    // deactivate examples when switching from one to the next
    if (!isActiveHash && state.prevHash !== nextHash) {
      Object.assign(nextState, ComponentExample.getClearedActiveState())
    }

    return nextState
  }

  componentDidUpdate(
    prevProps: Readonly<ComponentExampleProps>,
    prevState: Readonly<ComponentExampleState>,
    snapshot?: any,
  ): void {
    if (this.state.isActiveHash) {
      ComponentExample.setStateToURL(this.props, this.state)
    }
  }

  constructor(props) {
    super(props)
    const isActiveHash = ComponentExample.isActiveHash(props)

    this.state = {
      componentVariables: {},
      usedVariables: {},
      showCode: isActiveHash,
      showRtl: false,
      showTransparent: false,
      showVariables: false,
      ...(isActiveHash && ComponentExample.getStateFromURL(props)),
      ...(/\.rtl$/.test(props.examplePath) && { showRtl: true }),
    }
  }

  updateHash = () => {
    const { isActive } = this.state

    if (isActive) this.setHashAndScroll()
  }

  setHashAndScroll = () => {
    const { anchorName } = this.state
    const { history } = this.props

    history.replace({ ...history.location, hash: anchorName })
    scrollToAnchor()
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
    const lineCount = currentCode.match(/^/gm)!.length

    return (
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
    )
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
    this.setState({ usedVariables: variables })
  }

  render() {
    const {
      component,
      children,
      currentCode,
      currentCodeLanguage,
      currentCodePath,
      description,
      title,
      wasCodeChanged,
    } = this.props
    const {
      anchorName,
      componentVariables,
      usedVariables,
      showCode,
      showRtl,
      showTransparent,
      showVariables,
    } = this.state

    const newTheme: ThemeInput = {
      componentVariables: {
        ...componentVariables,
        ProviderBox: { background: showTransparent ? 'initial' : undefined },
      },
    }
    const exampleStyles = {
      padding: '2rem',
      ...(showTransparent && {
        backgroundImage:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
        backgroundRepeat: 'repeat',
      }),
    }

    return (
      <Flex column>
        <Flex.Item>
          <KnobProvider components={knobComponents}>
            {/* Ensure anchor links don't occlude card shadow effect */}
            <div id={anchorName} style={{ position: 'relative', bottom: '1rem' }} />

            <Segment styles={{ borderBottom: '1px solid #ddd' }}>
              <Flex>
                <ComponentExampleTitle description={description} title={title} />

                <Flex.Item push>
                  <ComponentControls
                    anchorName={anchorName}
                    exampleCode={currentCode}
                    exampleLanguage={currentCodeLanguage}
                    examplePath={currentCodePath}
                    onShowCode={this.handleShowCodeClick}
                    onCopyLink={this.handleDirectLinkClick}
                    onShowRtl={this.handleShowRtlClick}
                    onShowVariables={this.handleShowVariablesClick}
                    onShowTransparent={this.handleShowTransparentClick}
                    showCode={showCode}
                    showRtl={showRtl}
                    showVariables={showVariables}
                    showTransparent={showTransparent}
                  />
                </Flex.Item>
              </Flex>

              <KnobInspector>
                {knobs => knobs && <KnobsSnippet>{knobs}</KnobsSnippet>}
              </KnobInspector>
            </Segment>

            {children && <Segment styles={childrenStyle}>{children}</Segment>}

            {showCode || wasCodeChanged ? (
              <SourceRender
                babelConfig={babelConfig}
                source={currentCode}
                renderHtml={false}
                resolver={importResolver}
                unstable_hot
              >
                {({ element, error }) => (
                  <>
                    <Segment
                      className={`rendered-example ${this.getKebabExamplePath()}`}
                      styles={exampleStyles}
                    >
                      <Provider theme={newTheme} rtl={showRtl}>
                        <VariableResolver onResolve={this.handleVariableResolve}>
                          {element}
                        </VariableResolver>
                      </Provider>
                    </Segment>

                    <LogInspector silent />

                    {showCode && (
                      <div
                        style={{
                          boxShadow: `0 0 0 0.5em ${error ? ERROR_COLOR : 'transparent'}`,
                        }}
                      >
                        {this.renderSourceCode()}
                        {error && (
                          <pre
                            style={{
                              position: 'sticky',
                              bottom: 0,
                              padding: '1em',
                              // don't block viewport
                              maxHeight: '50vh',
                              overflowY: 'auto',
                              color: '#fff',
                              background: ERROR_COLOR,
                              whiteSpace: 'pre-wrap',
                              // above code editor text :/
                              zIndex: 4,
                            }}
                          >
                            {error.toString()}
                          </pre>
                        )}
                      </div>
                    )}
                  </>
                )}
              </SourceRender>
            ) : (
              <>
                <Segment
                  className={`rendered-example ${this.getKebabExamplePath()}`}
                  styles={exampleStyles}
                >
                  {React.createElement(component)}
                </Segment>
                <LogInspector silent />
              </>
            )}

            {showVariables && (
              <ComponentExampleVariables
                onChange={this.handleVariableChange}
                overriddenVariables={componentVariables}
                usedVariables={usedVariables}
              />
            )}
          </KnobProvider>
        </Flex.Item>
      </Flex>
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
