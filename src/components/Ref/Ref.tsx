import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { isForwardRef } from 'react-is'

import { ReactChildren } from '../../../types/utils'
import { handleRef } from '../../lib'

export interface RefProps {
  children: ReactChildren
  innerRef?: React.Ref<any>
}

export interface RefState {
  child: React.ReactElement<any> & { ref: React.Ref<any> }
  isForward: boolean
}

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends React.Component<RefProps, RefState> {
  state = {
    child: null,
    isForward: false,
  }

  static propTypes = {
    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.element.isRequired,

    /**
     * Called when a child component will be mounted or updated.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  static getDerivedStateFromProps(props: RefProps) {
    const child = React.Children.only(props.children)

    return {
      child,
      isForward: isForwardRef(child),
    }
  }

  componentDidMount() {
    if (!this.state.isForward) {
      handleRef(this.props.innerRef, findDOMNode(this))
    }
  }

  componentWillUnmount() {
    if (!this.state.isForward) {
      handleRef(this.props.innerRef, null)
    }
  }

  private handleRefOverride = (node: HTMLElement) => {
    handleRef(this.state.child.ref, node)
    handleRef(this.props.innerRef, node)
  }

  render() {
    const { child, isForward } = this.state

    return isForward
      ? React.cloneElement(child, {
          ref: this.handleRefOverride,
        })
      : child
  }
}
