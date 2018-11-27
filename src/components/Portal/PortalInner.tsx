import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../lib'

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  context?: HTMLElement

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
class PortalInner extends Component<PortalInnerProps> {
  public static propTypes = {
    ...commonPropTypes.childrenComponentPropTypes,
    context: PropTypes.object,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
  }

  public static defaultProps = {
    context: isBrowser() ? document.body : null,
  }

  public componentDidMount() {
    _.invoke(this.props, 'onMount', this.props)
  }

  public componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', this.props)
  }

  public render() {
    const { children, context } = this.props

    return context && createPortal(children, context)
  }
}

export default PortalInner
