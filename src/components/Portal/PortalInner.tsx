import * as PropTypes from 'prop-types'
import { invoke } from 'lodash'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import { Extendable } from '../../../types/utils'

export interface IPortalProps {
  onMount?: (props: IPortalProps) => void
  onUnmount?: (props: IPortalProps) => void
}

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends Component<Extendable<IPortalProps>, any> {
  public static propTypes = {
    /** Primary content. */
    children: PropTypes.node,

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

  public componentDidMount() {
    invoke(this.props, 'onMount', { ...this.props })
  }

  public componentWillUnmount() {
    invoke(this.props, 'onUnmount', { ...this.props })
  }

  public render() {
    return createPortal(this.props.children, document.body)
  }
}

export default PortalInner
