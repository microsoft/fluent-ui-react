import * as React from 'react'

import formatCode from '../utils/formatCode'
import Editor, { EDITOR_BACKGROUND_COLOR } from './Editor'

export interface CodeSnippetProps {
  fitted?: boolean
  label?: string
  mode?: 'jsx' | 'html' | 'sh'
  value: string
  style?: React.CSSProperties
}

const formatters = {
  sh: (val: string = ''): string => val.replace(/^/g, '$  '),
  html: (val: string = ''): string => formatCode(val, 'html'),
  jsx: (val: string = ''): string => formatCode(val, 'babylon'),
}

const CodeSnippet = ({ fitted, label, value, mode = 'jsx', ...rest }: CodeSnippetProps) => {
  const format = formatters[mode]
  const formattedValue = format(value)
    // remove eof line break, they are not helpful for snippets
    .replace(/\n$/, '')

  return (
    <div
      style={{
        position: 'relative',
        padding: '1rem',
        marginBottom: fitted ? 0 : '2rem',
        background: EDITOR_BACKGROUND_COLOR,
        ...rest.style,
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
        highlightActiveLine={false}
        highlightGutterLine={false}
        mode={mode}
        readOnly
        showGutter={false}
        showCursor={false}
        value={formattedValue}
        {...rest}
      />
    </div>
  )
}
export default CodeSnippet
