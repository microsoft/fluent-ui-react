import * as React from 'react'
import Editor, { EDITOR_BACKGROUND_COLOR } from './Editor'

export interface CodeSnippetProps {
  label?: string
  mode?: 'jsx' | 'html' | 'sh'
  value: string
  style?: React.CSSProperties
}

const CodeSnippet = ({ label, value, mode = 'jsx', style, ...rest }: CodeSnippetProps) => (
  <div
    style={{
      position: 'relative',
      padding: '1rem',
      marginBottom: '2rem',
      background: EDITOR_BACKGROUND_COLOR,
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        padding: '0.2rem 0.35rem',
        top: '1rem',
        right: '1rem',
        lineHeight: 1,
        color: '#899',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        border: '1px solid #566',
        zIndex: 100,
      }}
    >
      {label || mode}
    </div>
    <Editor
      id={btoa(value)}
      highlightActiveLine={false}
      highlightGutterLine={false}
      mode={mode}
      readOnly
      showGutter={false}
      showCursor={false}
      value={mode === 'sh' ? value.replace(/^/g, '$  ') : value}
      {...rest}
    />
  </div>
)
export default CodeSnippet
