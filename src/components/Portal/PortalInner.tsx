import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import { ReactChildren } from '../../../types/utils'
import { isBrowser } from '../../lib'

export interface PortalInnerProps {
  children?: ReactChildren
  context?: HTMLElement
  onMount?: (props: PortalInnerProps) => void
  onUnmount?: (props: PortalInnerProps) => void
}

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends Component<PortalInnerProps> {
  public static propTypes = {
    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node.isRequired,

    /** Existing element the portal should be bound to. */
    context: PropTypes.object,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {object} data - All props.
     */
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
