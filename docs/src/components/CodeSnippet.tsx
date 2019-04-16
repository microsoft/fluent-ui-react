import * as _ from 'lodash'
import * as React from 'react'

import formatCode from '../utils/formatCode'
import Editor, { EDITOR_BACKGROUND_COLOR } from './Editor'

export type CodeSnippetValue = string | string[] | Object

export interface CodeSnippetProps {
  className?: string
  fitted?: boolean
  label?: string
  mode?: 'json' | 'jsx' | 'html' | 'sh'
  value: CodeSnippetValue
  style?: React.CSSProperties
}

const normalizeToString = (value: CodeSnippetValue): string => {
  if (_.isArray(value)) return value.join('\n')
  return _.isObject(value) ? JSON.stringify(value, null, 2) : (value as string)
}

const formatters = {
  sh: (val: string = ''): string => val.replace(/^/g, '$  '),
  html: (val: string = ''): string => formatCode(val, 'html'),
  json: (val: string): string => val,
  jsx: (val: string = ''): string => formatCode(val, 'babylon'),
}

const CodeSnippet = ({ className, fitted, label, mode, value, ...restProps }: CodeSnippetProps) => {
  const format = formatters[mode]
  const formattedValue = format(normalizeToString(value))
    // remove eof line break, they are not helpful for snippets
    .replace(/\n$/, '')

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        padding: '1rem',
        marginBottom: fitted ? 0 : '2rem',
        background: EDITOR_BACKGROUND_COLOR,
        ...restProps.style,
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
        {...restProps}
      />
    </div>
  )
}

CodeSnippet.defaultProps = {
  mode: 'jsx',
}

export default CodeSnippet
