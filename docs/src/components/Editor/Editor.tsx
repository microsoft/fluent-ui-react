import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import AceEditor, { AceEditorProps } from 'react-ace'
import * as ace from 'brace'
import 'brace/ext/language_tools'
import 'brace/mode/html'
import 'brace/mode/jsx'
import 'brace/mode/sh'
import 'brace/theme/tomorrow_night'
import { EventStackSubscription, doesNodeContainClick } from 'src/lib'

const parentComponents = []

// Set up custom completers by using a ace extension
// https://github.com/thlorenz/brace/issues/19
const languageTools = ace.acequire('ace/ext/language_tools')

type Completion = {
  caption: string
  value: string
  meta: string
}

const semanticUIReactCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    const completions: Completion[] = []

    _.each(parentComponents, component => {
      const { name } = component._meta
      // Component
      completions.push({ caption: name, value: name, meta: 'Component' })

      // Its props (propTypes do not exist in prod, use handledProps added by babel)
      _.each(component.handledProps, propName => {
        // don't add duplicate prop completions
        if (_.find(completions, { value: propName })) return

        completions.push({ caption: propName, value: propName, meta: 'Component Prop' })
      })
    })
    callback(null, completions)
  },
}

languageTools.addCompleter(semanticUIReactCompleter)

export interface EditorProps extends AceEditorProps {
  id: string
  value?: string
  mode?: 'html' | 'jsx' | 'sh'
  onClick?: () => void
  onOutsideClick?: (e: Event) => void
  active?: boolean
  showCursor?: boolean
  highlightGutterLine?: boolean
}

export const EDITOR_BACKGROUND_COLOR = '#1D1F21'
export const EDITOR_GUTTER_COLOR = '#26282d'

class Editor extends React.Component<EditorProps> {
  private static readonly refName = 'aceEditor'
  private clickSubscription = EventStackSubscription.empty()

  public static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['html', 'jsx', 'sh']),
    onClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    active: PropTypes.bool,
    showCursor: PropTypes.bool,
  }

  public static defaultProps = {
    id: '',
    value: '',
    mode: 'jsx',
    theme: 'tomorrow_night',
    height: '100px',
    width: '100%',
    active: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    editorProps: { $blockScrolling: Infinity },
    showPrintMargin: false,
    tabSize: 2,
    maxLines: Infinity,
    readOnly: false,
    highlightActiveLine: true,
    highlightGutterLine: true,
    showCursor: true,
  }

  public componentWillReceiveProps(nextProps: EditorPropsWithDefaults) {
    const previousPros = this.props
    const { active, showCursor } = nextProps

    if (showCursor !== previousPros.showCursor) {
      this.setCursorVisibility(showCursor)
    }

    if (active !== previousPros.active) {
      if (active) {
        this.editor.focus() // focus editor when editor is active
        this.addDocumentListener()
      } else {
        this.removeDocumentListener()
      }
    }
  }

  public componentDidMount() {
    const { active, showCursor } = this.props as EditorPropsWithDefaults

    this.setCursorVisibility(showCursor)

    if (active) {
      this.addDocumentListener()
    }
  }

  public componentWillUnmount() {
    this.removeDocumentListener()
  }

  public render() {
    const { id, onClick, ...rest } = this.props

    return (
      <div onClick={onClick}>
        <AceEditor name={id} ref={Editor.refName} {...rest} />
      </div>
    )
  }

  private handleDocumentClick = (e: Event) => {
    const { onOutsideClick } = this.props
    if (!doesNodeContainClick(this.container, e) && onOutsideClick) {
      onOutsideClick(e)
    }
  }

  private addDocumentListener() {
    this.clickSubscription.replaceWith('click', this.handleDocumentClick)
  }

  private removeDocumentListener() {
    this.clickSubscription.stop()
  }

  private get editor() {
    return this.safeCall(() => (this.refs[Editor.refName] as any).editor)
  }

  private get renderer() {
    return this.safeCall(() => this.editor.renderer)
  }

  private get cursor(): HTMLElement {
    return this.safeCall(() => this.renderer.$cursorLayer.element)
  }

  private get container(): HTMLElement {
    return this.safeCall(() => this.renderer.container)
  }

  private setCursorVisibility(visible: boolean): void {
    this.safeCall(() => {
      this.cursor.style.display = visible ? '' : 'none'
    })
  }

  private safeCall<T>(cb: () => T, logError?: boolean): T | undefined {
    try {
      return cb()
    } catch (error) {
      if (logError) {
        console.error(`Editor.tsx:safeCall error: ${error}`)
      }
      return undefined
    }
  }
}

export default Editor

export type EditorPropsWithDefaults = EditorProps & (typeof Editor.defaultProps)
