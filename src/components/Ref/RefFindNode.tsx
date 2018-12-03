import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { handleRef } from '../../lib'

export interface RefProps {
  children: React.ReactElement<any>
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<any>
}

export default class RefFindNode extends React.Component<RefProps> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  componentDidMount() {
    handleRef(this.props.innerRef, findDOMNode(this))
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null)
  }

  render() {
    const { children } = this.props

    return children
  }
}
