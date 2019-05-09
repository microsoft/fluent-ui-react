import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactIs from 'react-is'

import RefFindNode from './RefFindNode'
import RefForward from './RefForward'

export interface RefProps {
  children: React.ReactElement<any>

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: React.Ref<HTMLElement>
}

const Ref: React.FunctionComponent<RefProps> = props => {
  const { children, innerRef } = props

  const child = React.Children.only(children)
  const ElementType = ReactIs.isForwardRef(child) ? RefForward : RefFindNode

  return <ElementType innerRef={innerRef}>{child}</ElementType>
}

Ref.displayName = 'Ref'
Ref.propTypes = {
  children: PropTypes.element.isRequired,
  innerRef: customPropTypes.ref.isRequired as PropTypes.Validator<React.Ref<any>>,
}

export default Ref
