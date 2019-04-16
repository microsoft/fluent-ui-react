import * as React from 'react'

import CodeSnippet from 'docs/src/components/CodeSnippet'
import renderElementToJSX from 'docs/src/components/ExampleSnippet/renderElementToJSX'

type ComponentPlaygroundSnippetProps = {
  component: React.FunctionComponent
}

/**
 * This component uses `react-element-to-jsx-string` to get a generated markup with props.
 */
const ComponentPlaygroundSnippet: React.FunctionComponent<
  ComponentPlaygroundSnippetProps
> = props => {
  const { component } = props

  if (typeof component === 'function' && !!component.prototype.isReactComponent) {
    throw new Error('We can handle only functional components as root component.')
  }

  const jsxElement = component(null)
  const jsxMarkup = renderElementToJSX(jsxElement)

  return <CodeSnippet fitted mode="jsx" value={jsxMarkup} />
}

export default ComponentPlaygroundSnippet
