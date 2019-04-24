import * as React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'

const renderElementToJSX = (target: React.ReactNode, triggerErrorOnRenderFn: boolean = false) => {
  let renderHasFunction

  const jsxMarkup = reactElementToJSXString(target, {
    displayName: (element: React.ReactElement<any>): string =>
      // @ts-ignore
      element.type.displayName ||
      // @ts-ignore // function name
      element.type.name ||
      // function without a name, you should provide one
      (typeof element.type === 'function' ? 'NoDisplayName' : element.type),
    showDefaultProps: false,
    showFunctions: true,
    functionValue: () => (renderHasFunction = true),
  })

  if (process.env.NODE_ENV !== 'production') {
    if (renderHasFunction && triggerErrorOnRenderFn) {
      throw new Error(
        [
          "This ExampleSnippet's render prop output includes function.",
          ' A helpful JSX string cannot be generated for functions.',
          ' Please define a `value` string prop that displays readable code to the user.',
          '\n\n',
          'RENDERED:',
          '\n\n',
          jsxMarkup,
        ].join(''),
      )
    }
  }

  return jsxMarkup
}

export default renderElementToJSX
