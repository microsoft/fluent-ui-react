import * as React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'
import CodeSnippet from '../CodeSnippet'

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
  let renderHasFunction

  const element = render()
  const string =
    value ||
    reactElementToJSXString(element, {
      displayName: (element: React.ReactElement<any>): string =>
        // @ts-ignore
        element.type.displayName ||
        // @ts-ignore // function name
        element.type.name ||
        // function without a name, you should provide one
        (typeof element.type === 'function' ? 'NoDisplayName' : element.type),
      showDefaultProps: false,
      showFunctions: true,
      functionValue: fn => (renderHasFunction = true),
    })

  if (process.env.NODE_ENV !== 'production') {
    if (renderHasFunction && !value) {
      throw new Error(
        [
          "This ExampleSnippet's render prop output includes function.",
          ' A helpful JSX string cannot be generated for functions.',
          ' Please define a `value` string prop that displays readable code to the user.',
          '\n\n',
          'RENDERED:',
          '\n\n',
          string,
        ].join(''),
      )
    }
  }

  return (
    <div style={rootStyle}>
      <CodeSnippet value={string} fitted />
      {element && <div style={renderedStyle}>{element}</div>}
    </div>
  )
}

export default ExampleSnippet
