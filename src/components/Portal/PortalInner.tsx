import _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Component = React.Component
import { createPortal } from 'react-dom'

import { isBrowser } from '../../lib'
import Ref from '../Ref'

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends Component<any, any> {
  private ref: Element | Text

  public static propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,
  }

  public componentDidMount() {
    _.invoke(this.props, 'onMount', null, { ...this.props, node: this.ref })
  }

  public componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', null, { ...this.props, node: this.ref })
  }

  public handleRef = (c: Element | Text) => (this.ref = c)

  public render() {
    const { children, mountNode = isBrowser() ? document.body : null } = this.props

    return createPortal(<Ref innerRef={this.handleRef}>{children}</Ref>, mountNode)
  }
}

export default PortalInner
