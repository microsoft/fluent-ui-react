import * as React from 'react'

import { useCopyToClipboard } from '../CopyToClipboard'
import { CodeSnippetProps } from './types'

type CopySnippetLabelProps = Pick<CodeSnippetProps, 'copyable' | 'label' | 'mode'> & {
  value: string
}

const CodeSnippetLabel: React.FunctionComponent<CopySnippetLabelProps> = props => {
  const { copyable, label, mode, value } = props
  const hasLabel = label !== false

  const [active, onCopy] = useCopyToClipboard(value)

  return (
    hasLabel && (
      <div
        onClick={copyable ? onCopy : undefined}
        style={{
          border: '1px solid #566',
          color: '#899',
          cursor: copyable ? 'pointer' : 'default',
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          lineHeight: 1,
          padding: '0.2rem 0.35rem',
          position: 'absolute',
          right: '1rem',
          top: '1rem',
          zIndex: 100,
        }}
        title={copyable ? 'Copy' : undefined}
      >
        <div>{label || mode}</div>
        {copyable && <div style={{ marginLeft: '5px' }}>{active ? '✔ ' : '📋'}</div>}
      </div>
    )
  )
}

export default CodeSnippetLabel
