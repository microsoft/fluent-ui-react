import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { isForwardRef } from 'react-is'

import { ChildrenComponentProps } from '../../lib'
import { ReactProps } from '../../types'
import RefFindNode from './RefFindNode'
import RefForward from './RefForward'

export interface RefProps extends ChildrenComponentProps<React.ReactElement<any>> {
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: React.Ref<any>
}

const Ref: React.FunctionComponent<ReactProps<RefProps>> = props => {
  const { children, innerRef } = props

  const child = React.Children.only(children)
  const ElementType = isForwardRef(child) ? RefForward : RefFindNode

  const window: any = {
    componentCount: { TOTAL: 0, Box: 0 },
    localStorage: { setItem: () => null, getItem: () => null },
  }

  // TODO: Heads up!  This assumes a single renderm, we're trying to count "mount"...
  window.componentCount.TOTAL++
  window.componentCount.Ref = (window.componentCount.Ref || 0) + 1

  return <ElementType innerRef={innerRef}>{child}</ElementType>
}

Ref.displayName = 'Ref'
Ref.propTypes = {
  children: PropTypes.element.isRequired,
  innerRef: customPropTypes.ref.isRequired as PropTypes.Validator<React.Ref<any>>,
}

export default Ref
