import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactIs from 'react-is'

import RefFindNode from './RefFindNode'
import RefForward from './RefForward'
import { RefProps, refPropType } from './types'

const Ref: React.FunctionComponent<RefProps> = props => {
  const { children, innerRef } = props

  const child = React.Children.only(children)
  const ElementType = ReactIs.isForwardRef(child) ? RefForward : RefFindNode

  return <ElementType innerRef={innerRef}>{child}</ElementType>
}

Ref.displayName = 'Ref'
// TODO: use Babel plugin for this
if (process.env.NODE_ENV !== 'production') {
  Ref.propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: refPropType.isRequired,
  }
}

export default Ref
