import * as React from 'react'
import { childrenExist } from '../../lib'

export type FlexBodyProps = {
  children?: any
}

const flexFluid = { flex: 1 }

/**
 * Injects flex:1 into only child, wraps children otherwise.
 */
export const FlexBody: React.FunctionComponent<FlexBodyProps> = props => {
  const { children } = props

  if (childrenExist(children)) {
    return <div style={flexFluid}>{children}</div>
  }

  return React.cloneElement(children, {
    ...children.props,
    ...{ style: { ...children.props.style, ...flexFluid } },
  })
}

export default FlexBody
