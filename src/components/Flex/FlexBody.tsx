import * as React from 'react'

export type FlexBodyProps = {
  children?: any
}

const flexFluid = { flex: 1 }

/**
 * Injects flex:1 into only child, wraps children otherwise.
 */
export const FlexBody: React.FunctionComponent<FlexBodyProps> = props => {
  const { children } = props

  // check for multiiple children
  // should it be allowed?
  if (Array.isArray(children)) {
    return <div style={flexFluid}>{children}</div>
  }

  // Only one child, inject fluid property
  return React.cloneElement(children, {
    ...children.props,
    ...{ style: { ...children.props.style, ...flexFluid } },
  })
}

FlexBody.displayName = 'FlexBody'
export default FlexBody
