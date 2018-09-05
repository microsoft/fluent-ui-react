import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import { ItemShorthand, Extendable } from '../../../types/utils'
import { IPortalGenericProps, IPortalGenericState, PortalGeneric } from '../../lib/PortalGeneric'

export interface IPortalProps extends IPortalGenericProps {
  content?: ItemShorthand | ItemShorthand[]
  onMount?: (props: IPortalProps) => void
  onUnmount?: (props: IPortalProps) => void
  trigger?: JSX.Element
  triggerRef?: (node: HTMLElement) => void
  open?: boolean
}

export interface IPortalState extends IPortalGenericState {}

/**
 * A component that allows you to render children outside their parent.
 */
class Portal extends PortalGeneric<Extendable<IPortalProps>, IPortalState> {
  public static propTypes = {
    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    /** Initial open value */
    defaultOpen: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /**
     * Called with a ref to the trigger node.
     *
     * @param {JSX.Element} node - Referred node.
     */
    triggerRef: PropTypes.func,
  }

  public state = { open: false }

  public renderComponent({  }: IRenderResultConfig<IPortalProps>): React.ReactNode {
    const { content, children, trigger } = this.props
    const portalContent = (childrenExist(children) ? children : content) as JSX.Element
    return (
      <React.Fragment>
        {this.renderPortal(portalContent)}
        {this.renderTrigger(trigger as JSX.Element)}
      </React.Fragment>
    )
  }
}

export default Portal
