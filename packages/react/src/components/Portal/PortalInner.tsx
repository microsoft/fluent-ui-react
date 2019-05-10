import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../lib'
import { ReactProps } from '../../types'

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  mountNode?: HTMLElement

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {object} data - All props.
   */
  onMount?: (props: PortalInnerProps) => void

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {object} data - All props.
   */
  onUnmount?: (props: PortalInnerProps) => void
}

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends React.Component<ReactProps<PortalInnerProps>> {
  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      animated: false,
      as: false,
      className: false,
      content: false,
      styled: false,
    }),
    mountNode: PropTypes.object,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
  }

  static defaultProps = {
    mountNode: isBrowser() ? document.body : null,
  }

  componentDidMount() {
    _.invoke(this.props, 'onMount', this.props)
  }

  componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', this.props)
  }

  render() {
    const { children, mountNode } = this.props

    return mountNode && ReactDOM.createPortal(children, mountNode)
  }
}

export default PortalInner
