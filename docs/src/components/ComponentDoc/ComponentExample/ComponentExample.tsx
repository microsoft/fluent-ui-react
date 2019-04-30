import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import * as copyToClipboard from 'copy-to-clipboard'
import SourceRender from 'react-source-render'

import {
  Divider,
  Flex,
  Form,
  Input,
  Menu,
  Segment,
  Provider,
  themes,
  Grid,
  ICSSInJSStyle,
} from '@stardust-ui/react'

import { examplePathToHash, getFormattedHash, scrollToAnchor } from 'docs/src/utils'
import { callable, constants } from 'src/lib'
import Editor, { EDITOR_BACKGROUND_COLOR, EDITOR_GUTTER_COLOR } from 'docs/src/components/Editor'
import { babelConfig, importResolver } from 'docs/src/components/Playground/renderConfig'
import ExampleContext, { ExampleContextValue } from 'docs/src/context/ExampleContext'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'
import ComponentSourceManager, {
  ComponentSourceManagerRenderProps,
} from '../ComponentSourceManager'
import { ThemeInput, ThemePrepared } from 'packages/react/src/themes/types'
import { mergeThemeVariables } from '../../../../../packages/react/src/lib/mergeThemes'
import { ThemeContext } from 'docs/src/context/ThemeContext'
import CodeSnippet from '../../CodeSnippet'
import CopyToClipboard from 'docs/src/components/CopyToClipboard'
import ComponentExampleKnobs from './ComponentExampleKnobs'

export interface ComponentExampleProps
  extends RouteComponentProps<any, any>,
    ComponentSourceManagerRenderProps,
    ExampleContextValue {
  title: React.ReactNode
  description?: React.ReactNode
  examplePath: string
  themeName?: string
}

interface ComponentExampleState {
  themeName: string
  componentVariables: Object
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
  anchorName: string
  kebabExamplePath: string

  constructor(props) {
    super(props)

    const { examplePath, themeName } = props

    this.anchorName = examplePathToHash(examplePath)
    this.state = {
      themeName,
      showCode: this.isActiveHash(),
      componentVariables: {},
      showRtl: examplePath && examplePath.endsWith('rtl'),
      showTransparent: false,
      showVariables: false,
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
    const { themeName } = nextProps
    if (this.state.themeName !== themeName) {
      this.setState({ themeName })
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

  handlePass = () => {
    const { title } = this.props

    if (title) this.props.onExamplePassed(this.anchorName)
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
    const { showRtl, showTransparent, componentVariables, themeName } = this.state

    const theme = themes[themeName]
    const newTheme: ThemeInput = {
      siteVariables: theme.siteVariables,
      componentVariables: mergeThemeVariables(theme.componentVariables, {
        [this.getDisplayName()]: componentVariables,
      }),
      rtl: showRtl,
    }

    const providerVariables = showTransparent ? { background: 'initial' } : undefined

    return (
      <Provider theme={newTheme} variables={providerVariables}>
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

  exampleMenuVariables = {
    primaryActiveBackgroundColor: 'transparent',
    primaryActiveBorderColor: 'white',
    primaryActiveColor: 'white',
    primaryBorderColor: 'white',
    activeColor: 'white',
    disabledColor: '#ffffff80',
    color: '#ffffff80',
  }

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
        primary
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
        primary
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
          <CopyToClipboard
            key="copy"
            render={(active, onClick) => (
              <Component
                {...props}
                active={active}
                icon={active ? 'check' : 'copy'}
                onClick={onClick}
              />
            )}
            value={currentCode}
          />
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
        size="small"
        primary
        underlined
        activeIndex={-1}
        styles={codeEditorStyle}
        variables={{
          activeColor: 'white',
          disabledColor: '#ffffff60',
          color: '#ffffffb0',
        }}
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
          <Menu
            size="small"
            styles={{ display: 'flex', justifyContent: 'space-between', border: 'none' }}
          >
            {this.renderAPIsMenu()}
            {this.renderLanguagesMenu()}
          </Menu>

          {this.renderCodeEditorMenu()}
        </div>

        <Editor value={currentCode} onChange={handleCodeChange} />
      </div>
    ) : null
  }

  renderError = () => {
    return (
      <SourceRender.Consumer>
        {({ error }) =>
          error && (
            <Segment inverted color="red" size="small">
              <pre style={{ whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
            </Segment>
          )
        }
      </SourceRender.Consumer>
    )
  }

  renderHTML = () => {
    const { showCode } = this.state
    if (!showCode) return null

    return (
      <SourceRender.Consumer>
        {props => (
          <div {...props}>
            <Divider fitted />
            <CodeSnippet fitted label="Rendered HTML" mode="html" value={props.markup} />
          </div>
        )}
      </SourceRender.Consumer>
    )
  }

  renderVariables = () => {
    const { showVariables } = this.state
    if (!showVariables) return undefined

    const displayName = this.getDisplayName()

    return (
      <div style={{ background: 'white' } as React.CSSProperties}>
        <Divider>
          <span style={{ opacity: 0.5 }}>Theme</span>
        </Divider>
        <Provider.Consumer
          render={({ siteVariables, componentVariables }: ThemePrepared) => {
            const mergedVariables = mergeThemeVariables(componentVariables, {
              [displayName]: this.state.componentVariables,
            })
            const variables = mergedVariables[displayName]

            if (!variables) {
              return <Segment inverted>{displayName} has no variables to edit.</Segment>
            }

            const variablesObject = callable(variables)(siteVariables)

            const items: any[] = []

            return (
              <Form styles={{ padding: '1rem' }}>
                {_.toPairs(variablesObject).forEach((pair, key) => {
                  items.push(
                    <Form.Field
                      key={pair[0]}
                      label={pair[0]}
                      control={{
                        as: Input,
                        defaultValue: pair[1],
                        onChange: this.handleVariableChange(displayName, pair[0]),
                      }}
                    />,
                  )
                })}
                <Grid columns="4" content={items} />
              </Form>
            )
          }}
        />
      </div>
    )
  }

  handleVariableChange = (component, variable) => (e, { value }) => {
    this.setState(state => ({
      componentVariables: {
        ...state.componentVariables,
        [variable]: value,
      },
    }))
  }

  render() {
    const {
      children,
      currentCode,
      currentCodeLanguage,
      currentCodePath,
      description,
      title,
    } = this.props
    const { showCode, showRtl, showTransparent, showVariables } = this.state

    return (
      <Flex column>
        <Flex.Item>
          <KnobProvider>
            {/* Ensure anchor links don't occlude card shadow effect */}
            <div id={this.anchorName} style={{ position: 'relative', bottom: '1rem' }} />

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
                    showCode={showCode}
                    showRtl={showRtl}
                    showTransparent={showTransparent}
                    showVariables={showVariables}
                  />
                </Flex.Item>
              </Flex>

              <KnobInspector>
                {knobs => knobs && <ComponentExampleKnobs>{knobs}</ComponentExampleKnobs>}
              </KnobInspector>
            </Segment>

            {children && <Segment styles={childrenStyle}>{children}</Segment>}

            <SourceRender
              babelConfig={babelConfig}
              source={currentCode}
              render={this.renderElement}
              renderHtml={showCode}
              resolver={importResolver}
            >
              <Provider.Consumer
                render={({ siteVariables }) => {
                  return (
                    <Segment
                      className={`rendered-example ${this.getKebabExamplePath()}`}
                      styles={{
                        padding: '2rem',
                        color: siteVariables.bodyColor,
                        backgroundColor: siteVariables.bodyBackground,
                        ...(showTransparent && {
                          backgroundImage:
                            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
                          backgroundRepeat: 'repeat',
                        }),
                      }}
                    >
                      <SourceRender.Consumer>{({ element }) => element}</SourceRender.Consumer>
                    </Segment>
                  )
                }}
              />
              <Segment styles={{ padding: 0 }}>
                {this.renderSourceCode()}
                {this.renderError()}
                {this.renderHTML()}
                {this.renderVariables()}
              </Segment>
              <div style={{ paddingBottom: '10px' }} />
            </SourceRender>
          </KnobProvider>
        </Flex.Item>
      </Flex>
    )
  }
}

const ComponentExampleWithTheme = props => (
  <ThemeContext.Consumer>
    {({ themeName }) => (
      <ExampleContext.Consumer>
        {exampleProps => (
          <ComponentSourceManager examplePath={props.examplePath}>
            {codeProps => (
              <ComponentExample {...props} {...exampleProps} {...codeProps} themeName={themeName} />
            )}
          </ComponentSourceManager>
        )}
      </ExampleContext.Consumer>
    )}
  </ThemeContext.Consumer>
)

export default withRouter(ComponentExampleWithTheme)
