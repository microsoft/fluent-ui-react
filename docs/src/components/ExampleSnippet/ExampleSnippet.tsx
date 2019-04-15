import * as React from 'react'

import CodeSnippet from '../CodeSnippet'
import renderElementToJSX from './renderElementToJSX'

export type ExampleSnippetProps = {
  value?: string
  render?: () => React.ReactNode
}

const rootStyle = {
  background: 'white',
  marginBottom: '2rem',
  boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
}

const renderedStyle = {
  padding: '1rem',
}

const ExampleSnippet = ({ render = () => null, value }: ExampleSnippetProps) => {
  const element = render()
  const string = value || renderElementToJSX(element, !value)

  return (
    <div style={rootStyle}>
      <CodeSnippet value={string} fitted />
      {element && <div style={renderedStyle}>{element}</div>}
    </div>
  )
}

export default ExampleSnippet
