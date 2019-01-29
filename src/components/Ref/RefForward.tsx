import * as PropTypes from 'prop-types'
import * as React from 'react'

import { ChildrenComponentProps, customPropTypes, handleRef } from '../../lib'

export interface RefForwardProps
  extends ChildrenComponentProps<React.ReactElement<any> & { ref: React.Ref<any> }> {
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<any>
}

export default class RefForward extends React.Component<RefForwardProps> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: customPropTypes.ref,
  }

  private handleRefOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props

    handleRef(children.ref, node)
    handleRef(innerRef, node)
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, {
      ref: this.handleRefOverride,
    })
  }
}
