import * as React from 'react'
import CodeSnippet, { CodeSnippetProps } from '../CodeSnippet'

const ExampleSnippet = ({
  render,
  style,
  ...rest
}: CodeSnippetProps & {
  render?: () => React.ReactNode
}) => (
  <div
    style={{
      background: 'white',
      marginBottom: '2rem',
      boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
      ...style,
    }}
  >
    <CodeSnippet {...rest} style={{ marginBottom: 0 }} />
    {render && <div style={{ padding: '1rem' }}>{render()}</div>}
  </div>
)

export default ExampleSnippet
