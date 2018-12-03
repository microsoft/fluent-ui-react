import * as PropTypes from 'prop-types'
import * as React from 'react'
import { isForwardRef } from 'react-is'

import { ReactChildren } from '../../../types/utils'
import RefFindNode from './RefFindNode'
import RefForward from './RefForward'

export interface RefProps {
  children: ReactChildren
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<any>
}

const Ref: React.SFC<RefProps> = props => {
  const { children, innerRef } = props

  const child = React.Children.only(children)
  const ElementType = isForwardRef(child) ? RefForward : RefFindNode

  return <ElementType innerRef={innerRef}>{child}</ElementType>
}

Ref.propTypes = {
  children: PropTypes.element.isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

export default Ref
