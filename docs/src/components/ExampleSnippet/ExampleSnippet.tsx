import { CodeSnippet } from '@stardust-ui/docs-components'
import * as React from 'react'

import renderElementToJSX from './renderElementToJSX'

export type ExampleSnippetProps = {
  render?: () => React.ReactNode
  value?: string
}

const rootStyle = {
  background: 'white',
  marginBottom: '2rem',
  boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
}

const renderedStyle = {
  padding: '1rem',
}

const ExampleSnippet: React.FunctionComponent<ExampleSnippetProps> = props => {
  const { children, render = () => null, value } = props

  const element: React.ReactNode = render() || React.Children.only(children)
  const isFunctionWithoutValue = render && !value
  const string = value || renderElementToJSX(element, !isFunctionWithoutValue)

  return (
    <div style={rootStyle}>
      <CodeSnippet value={string} fitted />
      {element && <div style={renderedStyle}>{element}</div>}
    </div>
  )
}

export default ExampleSnippet
