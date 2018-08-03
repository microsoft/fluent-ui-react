import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { PureComponent, isValidElement, CSSProperties } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { html } from 'js-beautify'
import copyToClipboard from 'copy-to-clipboard'
import { Divider, Form, Grid, Menu, Segment, Visibility } from 'semantic-ui-react'
import { Provider } from '@stardust-ui/react'

import { theme as teamsTheme } from 'src/themes/teams'

import {
  examplePathToHash,
  getFormattedHash,
  knobsContext,
  repoURL,
  scrollToAnchor,
} from 'docs/src/utils'
import evalTypeScript from 'docs/src/utils/evalTypeScript'
import { callable, pxToRem, doesNodeContainClick } from 'src/lib'
import Editor from 'docs/src/components/Editor'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'
import ContributionPrompt from '../ContributionPrompt'
import getSourceCodeManager, { ISourceCodeManager, SourceCodeType } from './SourceCodeManager'
import { ITheme } from '../../../../../src/../types/theme'

export interface IComponentExampleProps extends RouteComponentProps<any, any> {
  title: string
  description: string
  examplePath: string
  suiVersion?: string
}

interface IComponentExampleState {
  knobs: Object
  theme: ITheme
  exampleElement?: JSX.Element
  handleMouseLeave?: () => void
  handleMouseMove?: () => void
  sourceCode?: string
  markup?: string
  error?: string
  showCode?: boolean
  showHTML?: boolean
  showRtl?: boolean
  showVariables?: boolean
  isHovering?: boolean
  copiedCode?: boolean
}

const EDITOR_BACKGROUND_COLOR = '#1D1F21'
const EDITOR_GUTTER_COLOR = '#26282d'

const childrenStyle: CSSProperties = {
  paddingTop: 0,
  maxWidth: pxToRem(500),
}

const codeTypeApiButtonLabels: { [key in SourceCodeType]: string } = {
  normal: 'Children API',
  shorthand: 'Shorthand API',
}

/**
 * Renders a `component` and the raw `code` that produced it.
 * Allows toggling the the raw `code` code block.
 */
class ComponentExample extends PureComponent<IComponentExampleProps, IComponentExampleState> {
  componentRef: React.Component
  sourceCodeMgr: ISourceCodeManager
  anchorName: string
  kebabExamplePath: string
  KnobsComponent: any

  state: IComponentExampleState = {
    knobs: {},
    theme: teamsTheme,
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
    suiVersion: PropTypes.string,
    title: PropTypes.node,
  }

  componentWillMount() {
    const { examplePath } = this.props
    this.sourceCodeMgr = getSourceCodeManager(examplePath)
    this.anchorName = examplePathToHash(examplePath)
    const exampleElement = this.renderExampleFromCode(this.sourceCodeMgr.currentCode)

    this.setState({
      exampleElement,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove,
      showCode: this.isActiveHash(),
      showHTML: false,
      sourceCode: this.sourceCodeMgr.currentCode,
      markup: renderToStaticMarkup(exampleElement),
    })
  }

  componentWillReceiveProps(nextProps: IComponentExampleProps) {
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
      showHTML: false,
      showRtl: false,
      showVariables: false,
    })
  }

  isActiveState = () => {
    const { showCode, showHTML, showVariables } = this.state

    return showCode || showHTML || showVariables
  }

  isActiveHash = () => this.anchorName === getFormattedHash(this.props.location.hash)

  clickedOutsideComponent = (e: Event): boolean => {
    return !doesNodeContainClick((this.componentRef as any).ref, e)
  }

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
      handleMouseLeave: null,
      handleMouseMove: this.handleMouseMove,
    })
  }

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: null,
    })
  }

  handleShowCode = (shouldShowCode: boolean) => {
    if (shouldShowCode !== this.state.showCode) {
      this.setState({ showCode: shouldShowCode }, this.updateHash)
    }
  }

  handleShowCodeInactive = (e: Event) => {
    if (this.clickedOutsideComponent(e)) {
      this.handleShowCode(false)
    }
  }

  handleShowHTML = (shouldShowHTML: boolean) => {
    if (shouldShowHTML !== this.state.showHTML) {
      this.setState({ showHTML: shouldShowHTML }, this.updateHash)
    }
  }

  handleShowHTMLInactive = (e: Event) => {
    if (this.clickedOutsideComponent(e)) {
      this.handleShowHTML(false)
    }
  }

  handleShowRtlClick = e => {
    e.preventDefault()

    const { showRtl } = this.state

    this.setState({ showRtl: !showRtl }, () => {
      this.renderSourceCode()
    })
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

  handlePass = () => {
    const { title } = this.props

    if (title) _.invoke(this.context, 'onPassed', null, this.props)
  }

  copyJSX = () => {
    copyToClipboard(this.state.sourceCode)
    this.setState({ copiedCode: true })
    setTimeout(() => this.setState({ copiedCode: false }), 1000)
  }

  resetJSX = () => {
    if (this.sourceCodeMgr.originalCodeHasChanged && confirm('Lose your changes?')) {
      this.sourceCodeMgr.resetToOriginalCode()
      this.updateAndRenderSourceCode()
    }
  }

  getKnobsFilename = () => `./${this.props.examplePath}.knobs.tsx`

  getKebabExamplePath = () => {
    if (!this.kebabExamplePath) this.kebabExamplePath = _.kebabCase(this.props.examplePath)

    return this.kebabExamplePath
  }

  hasKnobs = () => _.includes(knobsContext.keys(), this.getKnobsFilename())

  setErrorDebounced = _.debounce(error => {
    this.setState({ error })
  }, 800)

  renderExampleFromCode = (code: string): JSX.Element => {
    const Example = code != null ? evalTypeScript(code) : this.renderMissingExample()
    return _.isFunction(Example) ? this.renderWithProvider(Example) : Example
  }

  renderMissingExample = (): JSX.Element => {
    const missingExamplePath = `./docs/src/examples/${this.sourceCodeMgr.currentPath}.tsx`
    return (
      <ContributionPrompt>
        Looks like we're missing <code title={missingExamplePath}>{missingExamplePath}</code>{' '}
        example.
      </ContributionPrompt>
    )
  }

  renderSourceCode = _.debounce(() => {
    try {
      const exampleElement = this.renderExampleFromCode(this.state.sourceCode)

      if (!isValidElement(exampleElement)) {
        this.setErrorDebounced(
          `Default export is not a valid React element. Check the example syntax.`,
        )
      } else {
        // immediately render a null error
        // but also ensure the last debounced error call is a null error
        const error = null
        this.setErrorDebounced(error)
        this.setState({
          error,
          exampleElement,
          markup: renderToStaticMarkup(exampleElement),
        })
      }
    } catch (err) {
      this.setErrorDebounced(err.message)
    }
  }, 250)

  handleKnobChange = knobs => {
    this.setState(
      prevState => ({
        knobs: {
          ...prevState.knobs,
          ...knobs,
        },
      }),
      this.renderSourceCode,
    )
  }

  getKnobsComponent = () => {
    if (typeof this.KnobsComponent !== 'undefined') {
      return this.KnobsComponent
    }

    this.KnobsComponent = this.hasKnobs() ? knobsContext(this.getKnobsFilename()).default : null

    return this.KnobsComponent
  }

  getKnobsValue = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? { ...Knobs.defaultProps, ...this.state.knobs } : null
  }

  renderKnobs = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? <Knobs {...this.getKnobsValue()} onKnobChange={this.handleKnobChange} /> : null
  }

  getComponentName = () => this.props.examplePath.split('/')[1]

  renderWithProvider(ExampleComponent) {
    const { showRtl, theme } = this.state

    const newTheme: ITheme = {
      siteVariables: teamsTheme.siteVariables,
      componentVariables: [teamsTheme.componentVariables, theme.componentVariables],
      componentStyles: teamsTheme.componentStyles,
      rtl: showRtl,
    }

    console.log('renderWithProvider Provider props', newTheme)

    return (
      <Provider theme={newTheme}>
        <ExampleComponent knobs={this.getKnobsValue()} />
      </Provider>
    )
  }

  handleChangeCode = (sourceCode: string) => {
    this.sourceCodeMgr.currentCode = sourceCode
    this.updateAndRenderSourceCode()
  }

  updateAndRenderSourceCode = () => {
    this.setState({ sourceCode: this.sourceCodeMgr.currentCode }, this.renderSourceCode)
  }

  setApiCodeType = (codeType: SourceCodeType) => {
    this.sourceCodeMgr.codeType = codeType
    this.updateAndRenderSourceCode()
  }

  renderApiCodeMenu = (): JSX.Element => {
    const { sourceCode } = this.state
    const lineCount = sourceCode && sourceCode.match(/^/gm).length

    const menuItems = [SourceCodeType.shorthand, SourceCodeType.normal].map(codeType => {
      // we disable the menu button for Children API in case we don't have the example for it
      return {
        active: this.sourceCodeMgr.codeType === codeType,
        disabled:
          codeType === SourceCodeType.normal && !this.sourceCodeMgr.isCodeValidForType(codeType),
        key: codeType,
        onClick: this.setApiCodeType.bind(this, codeType),
        content: codeTypeApiButtonLabels[codeType],
      }
    })

    return (
      // match code editor background and gutter size and colors
      <div style={{ background: EDITOR_BACKGROUND_COLOR } as CSSProperties}>
        <div
          style={
            {
              borderLeft: `${lineCount > 9 ? 41 : 34}px solid ${EDITOR_GUTTER_COLOR}`,
              paddingBottom: '1rem',
            } as CSSProperties
          }
        >
          <Menu size="small" inverted secondary pointing items={menuItems} />
        </div>
      </div>
    )
  }

  renderCodeEditorMenu = (): JSX.Element => {
    const { copiedCode } = this.state
    const { originalCodeHasChanged, currentPath } = this.sourceCodeMgr
    const codeEditorStyle: CSSProperties = {
      position: 'absolute',
      margin: 0,
      top: '2px',
      right: '0.5rem',
    }

    // get component name from file path:
    // elements/Button/Types/ButtonButtonExample
    const pathParts = currentPath.split(__PATH_SEP__)
    const filename = pathParts[pathParts.length - 1]

    const ghEditHref = [
      `${repoURL}/edit/master/docs/src/examples/${currentPath}.tsx`,
      `?message=docs(${filename}): your description`,
    ].join('')

    return (
      <Menu size="small" secondary inverted text style={codeEditorStyle}>
        <Menu.Item
          style={!originalCodeHasChanged ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
          icon="refresh"
          content="Reset"
          onClick={this.resetJSX}
        />
        <Menu.Item
          active={copiedCode} // to show the color
          icon={copiedCode ? { color: 'green', name: 'check' } : 'copy'}
          content="Copy"
          onClick={this.copyJSX}
        />
        <Menu.Item
          style={{ border: 'none' }}
          icon="github"
          content="Edit"
          href={ghEditHref}
          target="_blank"
        />
      </Menu>
    )
  }

  renderJSX = () => {
    const { showCode, sourceCode } = this.state

    if (!showCode) return null

    return (
      <div>
        {this.renderApiCodeMenu()}

        {sourceCode != null && (
          <div>
            {this.renderCodeEditorMenu()}
            <Editor
              setOptions={{ fixedWidthGutter: true, showFoldWidgets: false }}
              id={`${this.getKebabExamplePath()}-jsx`}
              value={sourceCode}
              onChange={this.handleChangeCode}
              onOutsideClick={this.handleShowCodeInactive}
            />
          </div>
        )}
      </div>
    )
  }

  renderError = () => {
    const { error } = this.state

    if (!error) return null

    return (
      <Segment size="small" color="red" basic inverted padded secondary>
        <pre>{error}</pre>
      </Segment>
    )
  }

  renderHTML = () => {
    const { error, showCode, markup } = this.state
    if (error || !showCode) return null

    // add new lines between almost all adjacent elements
    // moves inline elements to their own line
    const preFormattedHTML = markup.replace(/><(?!\/i|\/label|\/span|option)/g, '>\n<')

    const beautifiedHTML = html(preFormattedHTML, {
      indent_size: 2,
      indent_char: ' ',
      wrap_attributes: 'auto',
      wrap_attributes_indent_size: 2,
      end_with_newline: false,
    })

    return (
      <div>
        <Divider inverted horizontal>
          <span style={{ opacity: 0.5 }}>HTML</span>
        </Divider>
        <div style={{ padding: '1rem', filter: 'grayscale()' } as CSSProperties}>
          <Editor
            mode="html"
            showGutter={false}
            showCursor={false}
            readOnly
            highlightActiveLine={false}
            id={`${this.getKebabExamplePath()}-html`}
            onOutsideClick={this.handleShowHTMLInactive}
            value={beautifiedHTML}
          />
        </div>
      </div>
    )
  }

  renderVariables = () => {
    const { showVariables } = this.state
    if (!showVariables) return

    const name = this.getComponentName()

    return (
      <div>
        <Divider inverted horizontal>
          <span style={{ opacity: 0.5 }}>Theme</span>
        </Divider>
        <Provider.Consumer
          render={({ siteVariables, componentVariables }) => {
            const variables = componentVariables[name]

            if (!variables) {
              return (
                <Segment size="small" inverted padded basic>
                  {name} has no variables to edit.
                </Segment>
              )
            }

            const variablesObject = callable(variables)(siteVariables)

            return (
              <Form inverted widths="equal" style={{ padding: '1rem' }}>
                {_.chunk(_.toPairs(variablesObject), 2).map(fields => {
                  return (
                    <Form.Group widths="equal" key={fields.map(([key]) => key).join('-')}>
                      {fields.map(([key, val]) => (
                        <Form.Input
                          fluid
                          key={key}
                          label={key}
                          defaultValue={val}
                          onChange={this.handleVariableChange(name, key)}
                        />
                      ))}
                    </Form.Group>
                  )
                })}
              </Form>
            )
          }}
        />
      </div>
    )
  }

  handleVariableChange = (component, variable) => (e, { value }) => {
    this.setState(
      state => ({
        theme: {
          ...state.theme,
          componentVariables: {
            ...state.theme.componentVariables,
            [component]: {
              ...(state.theme.componentVariables && state.theme.componentVariables[component]),
              [variable]: value,
            },
          },
        },
      }),
      this.renderSourceCode,
    )
  }

  render() {
    const { children, description, examplePath, suiVersion, title } = this.props
    const {
      handleMouseLeave,
      handleMouseMove,
      exampleElement,
      isHovering,
      showCode,
      showHTML,
      showRtl,
      showVariables,
    } = this.state

    const isActive = this.isActiveHash() || this.isActiveState()

    const exampleStyle: CSSProperties = {
      position: 'relative',
      transition: 'box-shadow 200ms, background 200ms',
      background: '#fff',
      boxShadow: '0 1px 2px #ccc',
      ...(isActive
        ? {
            boxShadow: '0 8px 32px #aaa',
          }
        : isHovering && {
            boxShadow: '0 2px 8px #bbb',
            zIndex: 1,
          }),
    }

    const knobs = this.renderKnobs()

    return (
      <Visibility
        once={false}
        onTopPassed={this.handlePass}
        onTopPassedReverse={this.handlePass}
        ref={c => (this.componentRef = c)}
      >
        {/* Ensure anchor links don't occlude card shadow effect */}
        <div id={this.anchorName} style={{ position: 'relative', bottom: '1rem' }} />
        <Grid
          className="docs-example"
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={exampleStyle}
        >
          <Grid.Column width={16} style={{ borderBottom: '1px solid #ddd' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                <ComponentExampleTitle
                  description={description}
                  title={title}
                  suiVersion={suiVersion}
                />
              </div>
              <div style={{ flex: '0 0 auto' }}>
                <ComponentControls
                  anchorName={this.anchorName}
                  examplePath={examplePath}
                  onShowCode={this.handleShowCodeClick}
                  onCopyLink={this.handleDirectLinkClick}
                  onShowRtl={this.handleShowRtlClick}
                  onShowVariables={this.handleShowVariablesClick}
                  showCode={showCode}
                  showHTML={showHTML}
                  showRtl={showRtl}
                  showVariables={showVariables}
                  visible
                />
              </div>
            </div>
            {knobs}
          </Grid.Column>

          {children && (
            <Grid.Column width={16} style={childrenStyle}>
              {children}
            </Grid.Column>
          )}

          <Grid.Column
            width={16}
            className={`rendered-example ${this.getKebabExamplePath()}`}
            style={{ padding: '2rem' }}
          >
            <div dir={showRtl ? 'rtl' : undefined}>{exampleElement}</div>
          </Grid.Column>
          <Grid.Column width={16} style={{ padding: 0, background: EDITOR_BACKGROUND_COLOR }}>
            {this.renderJSX()}
            {this.renderError()}
            {this.renderHTML()}
            {this.renderVariables()}
          </Grid.Column>
        </Grid>
        <Divider section horizontal />
      </Visibility>
    )
  }
}

export default withRouter(ComponentExample)
