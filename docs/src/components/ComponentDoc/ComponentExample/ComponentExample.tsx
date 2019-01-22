import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import * as copyToClipboard from 'copy-to-clipboard'
import SourceRender from 'react-source-render'
import {
  Divider,
  Form,
  Input,
  Menu,
  Segment,
  Provider,
  themes,
  Grid,
  ICSSInJSStyle,
} from '@stardust-ui/react'

import { examplePathToHash, getFormattedHash, knobsContext, scrollToAnchor } from 'docs/src/utils'
import { callable, pxToRem, constants } from 'src/lib'
import Editor, { EDITOR_BACKGROUND_COLOR, EDITOR_GUTTER_COLOR } from 'docs/src/components/Editor'
import { babelConfig, importResolver } from 'docs/src/components/Playground/renderConfig'
import ExampleContext, { ExampleContextValue } from 'docs/src/context/ExampleContext'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'
import ComponentSourceManager, {
  ComponentSourceManagerRenderProps,
} from '../ComponentSourceManager'
import { ThemeInput, ThemePrepared } from 'src/themes/types'
import { mergeThemeVariables } from '../../../../../src/lib/mergeThemes'
import { ThemeContext } from 'docs/src/context/ThemeContext'
import CodeSnippet from '../../CodeSnippet'

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
  knobs: Object
  themeName: string
  componentVariables: Object
  handleMouseLeave: () => void
  handleMouseMove: () => void
  showCode: boolean
  showRtl: boolean
  showTransparent: boolean
  showVariables: boolean
  isHovering: boolean
  copiedCode: boolean
}

const childrenStyle: React.CSSProperties = {
  paddingTop: 0,
  paddingBottom: '10px',
  maxWidth: pxToRem(500),
}

const disabledStyle = { opacity: 0.5, pointerEvents: 'none' }

/**
 * Renders a `component` and the raw `code` that produced it.
 * Allows toggling the the raw `code` code block.
 */
class ComponentExample extends React.Component<ComponentExampleProps, ComponentExampleState> {
  anchorName: string
  kebabExamplePath: string
  KnobsComponent: any

  /*
  state = {
    knobs: {},
    themeName: 'teams',
    componentVariables: {},
    handleMouseLeave: _.noop,
    handleMouseMove: _.noop,
    showCode: false,
    showRtl: false,
    showTransparent: false,
    showVariables: false,
    isHovering: false,
    copiedCode: false,
  }

  static contextTypes = {
    onPassed: PropTypes.func,
  }

  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.node,
    examplePath: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    title: PropTypes.node,
    themeName: PropTypes.string,
    exampleTheme: PropTypes.string,
  }

  componentWillMount() {
    const { examplePath } = this.props
    this.anchorName = examplePathToHash(examplePath)
*/
  constructor(props) {
    super(props)

    this.anchorName = examplePathToHash(props.examplePath)
    this.state = {
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove,
      knobs: this.getDefaultKnobsValue(),
      showCode: this.isActiveHash(),
      themeName: 'teams',
      componentVariables: {},
      showRtl: false,
      showTransparent: false,
      showVariables: false,
      isHovering: false,
      copiedCode: false,
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

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
      handleMouseLeave: undefined,
      handleMouseMove: this.handleMouseMove,
    })
  }

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: undefined,
    })
  }

  handleShowRtlClick = e => {
    e.preventDefault()

    this.setState(prevState => ({ showRtl: !prevState.showRtl }))
  }

  handleShowCodeClick = e => {
    e.preventDefault()

    const { showCode } = this.state

    this.setState({ showCode: !showCode }, this.updateHash)
  }

  handleShowVariablesClick = e => {
    e.preventDefault()

    const { showVariables } = this.state

    this.setState({ showVariables: !showVariables }, this.updateHash)
  }

  handleShowTransparentClick = e => {
    e.preventDefault()

    const { showTransparent } = this.state

    this.setState({ showTransparent: !showTransparent })
  }

  handlePass = () => {
    const { title } = this.props

    if (title) this.props.onExamplePassed(this.anchorName)
  }

  copySourceCode = () => {
    copyToClipboard(this.props.currentCode)

    this.setState({ copiedCode: true })
    setTimeout(() => this.setState({ copiedCode: false }), 1000)
  }

  resetSourceCode = () => {
    if (confirm('Lose your changes?')) {
      this.props.handleCodeReset()
    }
  }

  getKnobsFilename = () => `./${this.props.examplePath}.knobs.tsx`

  getKebabExamplePath = () => {
    if (!this.kebabExamplePath) this.kebabExamplePath = _.kebabCase(this.props.examplePath)

    return this.kebabExamplePath
  }

  hasKnobs = () => _.includes(knobsContext.keys(), this.getKnobsFilename())

  renderElement = (element: React.ReactElement<any>) => {
    const { showRtl, componentVariables, themeName } = this.state

    const theme = themes[themeName]
    const newTheme: ThemeInput = {
      siteVariables: theme.siteVariables,
      componentVariables: mergeThemeVariables(theme.componentVariables, {
        [this.getDisplayName()]: componentVariables,
      }),
      rtl: showRtl,
    }

    return <Provider theme={newTheme}>{element}</Provider>
  }

  handleKnobChange = knobs => {
    this.setState(prevState => ({
      knobs: {
        ...prevState.knobs,
        ...knobs,
      },
    }))
  }

  getKnobsComponent = () => {
    if (typeof this.KnobsComponent !== 'undefined') {
      return this.KnobsComponent
    }

    this.KnobsComponent = this.hasKnobs() ? knobsContext(this.getKnobsFilename()).default : null

    return this.KnobsComponent
  }

  getDefaultKnobsValue = (overrides = {}) => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? { ...Knobs.defaultProps, overrides } : null
  }

  renderKnobs = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? (
      <Knobs
        {...this.getDefaultKnobsValue(this.state.knobs)}
        onKnobChange={this.handleKnobChange}
      />
    ) : null
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

  renderAPIsMenu = (): JSX.Element => {
    const { componentAPIs, currentCodeAPI } = this.props
    const menuItems = _.map(componentAPIs, ({ name, supported }, type) => (
      <Menu.Item
        active={currentCodeAPI === type}
        content={
          <span>
            {name}
            {!supported && <em> (not supported)</em>}
          </span>
        }
        disabled={!supported}
        key={type}
        onClick={this.handleCodeApiChange(type)}
      />
    ))

    return <Menu>{menuItems}</Menu>
  }

  renderLanguagesMenu = (): JSX.Element => {
    const { currentCodeLanguage } = this.props

    return (
      <Menu>
        <Menu.Item
          active={currentCodeLanguage === 'js'}
          content="JavaScript"
          onClick={this.handleCodeLanguageChange('js')}
        />
        <Menu.Item
          active={currentCodeLanguage === 'ts'}
          content="TypeScript"
          onClick={this.handleCodeLanguageChange('ts')}
        />
      </Menu>
    )
  }

  renderCodeEditorMenu = (): JSX.Element => {
    const {
      currentCodeLanguage,
      currentCodePath,
      canCodeBeFormatted,
      handleCodeFormat,
      wasCodeChanged,
    } = this.props
    const { copiedCode } = this.state

    const codeEditorStyle: React.CSSProperties = {
      position: 'absolute',
      margin: 0,
      top: '2px',
      right: '0.5rem',
    }
    // get component name from file path:
    // elements/Button/Types/ButtonButtonExample
    const pathParts = currentCodePath.split(__PATH_SEP__)
    const filename = pathParts[pathParts.length - 1]

    const ghEditHref = [
      `${constants.repoURL}/edit/master/docs/src/examples/${currentCodePath}.tsx`,
      `?message=docs(${filename}): your description`,
    ].join('')

    return (
      <Menu size="small" secondary styles={codeEditorStyle}>
        <SourceRender.Consumer>
          {({ error }) => (
            <Menu.Item
              icon={(error && 'bug') || (canCodeBeFormatted ? 'magic' : 'check')}
              color={error ? 'red' : undefined}
              active={!!error}
              content="Prettier"
              onClick={handleCodeFormat}
              style={!canCodeBeFormatted ? disabledStyle : undefined}
            />
          )}
        </SourceRender.Consumer>
        <Menu.Item
          styles={(!wasCodeChanged ? disabledStyle : undefined) as ICSSInJSStyle}
          icon="refresh"
          content="Reset"
          onClick={this.resetSourceCode}
        />
        <Menu.Item
          active={copiedCode} // to show the color
          icon={copiedCode ? { color: 'green', name: 'check' } : 'copy'}
          content="Copy"
          onClick={this.copySourceCode}
        />
        {currentCodeLanguage === 'ts' && (
          <Menu.Item
            style={{ border: 'none' }}
            icon="github"
            content="Edit"
            href={ghEditHref}
            target="_blank"
          />
        )}
      </Menu>
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
          <Menu attached="top" size="small" inverted secondary pointing>
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
            <Segment inverted>
              <pre>{error.toString()}</pre>
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
        {a => (
          <div {...a}>
            <Divider fitted />
            <CodeSnippet fitted label="Rendered HTML" mode="html" value={a.markup} />
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
    const {
      handleMouseLeave,
      handleMouseMove,
      knobs,
      showCode,
      showRtl,
      showTransparent,
      showVariables,
    } = this.state

    // const exampleStyle: React.CSSProperties = {
    //   position: 'relative',
    //   transition: 'box-shadow 200ms, background 200ms',
    //   background: '#fff',
    //   boxShadow: '0 1px 2px #ccc',
    //   ...(isActive
    //     ? {
    //         boxShadow: '0 8px 32px #aaa',
    //       }
    //     : isHovering && {
    //         boxShadow: '0 2px 8px #bbb',
    //         zIndex: 1,
    //       }),
    // }

    return (
      <Segment>
        {/* Ensure anchor links don't occlude card shadow effect */}
        <div id={this.anchorName} style={{ position: 'relative', bottom: '1rem' }} />

        <Segment
          width={19}
          styles={{ borderBottom: '1px solid #ddd' }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <ComponentExampleTitle description={description} title={title} />
            </div>
            <div style={{ flex: '0 0 auto' }}>
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
                visible
              />
            </div>
          </div>
          {this.renderKnobs()}
        </Segment>

        {children && (
          <Segment width={16} styles={childrenStyle}>
            {children}
          </Segment>
        )}

        <SourceRender
          babelConfig={babelConfig}
          knobs={knobs}
          source={currentCode}
          render={this.renderElement}
          //          renderHtml={showCode}
          renderHtml
          resolver={importResolver}
        >
          <Provider theme={themes[this.getThemeKey(this.props.themeName)]}>
            <Provider.Consumer
              render={({ siteVariables }) => {
                return (
                  <Segment
                    dir={showRtl ? 'rtl' : undefined}
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
          </Provider>
          <Segment styles={{ padding: 0 }}>
            {this.renderSourceCode()}
            {this.renderError()}
            {this.renderHTML()}
            {this.renderVariables()}
          </Segment>
          <div style={{ paddingBottom: '10px' }} />
        </SourceRender>
        <Divider />
      </Segment>
    )
  }

  private getThemeKey(text: string) {
    const key = _.find(this.getThemeOptions(), ['text', text])
    if (key) {
      return key.value
    }
    return 'teams'
  }

  private getThemeOptions = () => {
    return Object.keys(themes).map(key => ({
      text: _.startCase(key),
      value: key,
    }))
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
