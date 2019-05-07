import * as Prism from 'prismjs/components/prism-core'
import * as React from 'react'

// Order of PrismJS imports there is sensitive
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'

import { formatCode } from './formatCode'
import { CodeSnippetMode, CodeSnippetValue } from './types'

type CodeSnippetProps = {
  className?: string
  fitted?: boolean
  label?: React.ReactNode | false
  mode?: CodeSnippetMode
  value: CodeSnippetValue
  style?: React.CSSProperties
}

const CodeSnippet: React.FunctionComponent<CodeSnippetProps> = props => {
  const { className, fitted, label, mode, value } = props

  const codeClassName = `language-${mode}`
  const code = formatCode(value, mode)
  const ref = React.useRef(null)

  React.useLayoutEffect(() => {
    Prism.highlightElement(ref.current)
  })

  return (
    <div
      className={className}
      style={{
        fontSize: '12px',
        position: 'relative',
      }}
    >
      {label === false ? null : (
        <div
          style={{
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            border: '1px solid #566',
            color: '#899',
            lineHeight: 1,
            padding: '0.2rem 0.35rem',
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 100,
          }}
        >
          {label || mode}
        </div>
      )}
      <pre style={{ margin: fitted ? '0' : undefined }}>
        <code className={codeClassName} ref={ref}>
          {code}
        </code>
      </pre>
    </div>
  )
}

CodeSnippet.defaultProps = {
  mode: 'jsx',
}

export default React.memo(CodeSnippet)
