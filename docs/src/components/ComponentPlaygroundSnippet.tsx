import { CodeSnippet } from '@stardust-ui/docs-components'
import * as React from 'react'

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
  const { component, ...rest } = props

  if (typeof component === 'function' && !!component.prototype.isReactComponent) {
    throw new Error('We can handle only functional components as root component.')
  }

  const jsxElement = component(rest)
  const jsxMarkup = renderElementToJSX(jsxElement)

  return <CodeSnippet fitted mode="jsx" value={jsxMarkup} />
}

export default ComponentPlaygroundSnippet
