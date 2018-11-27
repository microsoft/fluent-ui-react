import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { handleRef } from '../../lib'

export interface RefProps {
  /**
   *  Used to set content when using childrenApi - internal only
   *  @docSiteIgnore
   */
  children?: React.ReactChild
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<any>
}

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends React.Component<RefProps> {
  static propTypes = {
    children: PropTypes.element,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  componentDidMount() {
    handleRef(this.props.innerRef, findDOMNode(this))
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null)
  }

  render() {
    return this.props.children && React.Children.only(this.props.children)
  }
}
