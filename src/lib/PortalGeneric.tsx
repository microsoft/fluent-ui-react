import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { eventStack, doesNodeContainClick, AutoControlledComponent } from '.'
import { Extendable } from 'utils'
import Ref from '../components/Ref'
import PortalInner from '../components/Portal/PortalInner'

type ReactMouseEvent = React.MouseEvent<HTMLElement>

export interface IPortalGenericProps {
  onMount?: (props: IPortalGenericProps) => void
  onUnmount?: (props: IPortalGenericProps) => void
  open?: boolean
}

export interface IPortalGenericState {
  open?: boolean
}

/**
 * A component that allows you to render children outside their parent.
 */
export abstract class PortalGeneric<
  P extends IPortalGenericProps,
  S extends IPortalGenericState
> extends AutoControlledComponent<Extendable<P>, S> {
  protected portalNode: HTMLElement
  protected triggerNode: HTMLElement

  public static propTypes = {
    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    /** Initial open value */
    defaultOpen: PropTypes.bool,

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
  }

  static autoControlledProps = ['open']

  getInitialAutoControlledState() {
    return { open: false }
  }

  protected renderPortal(content: JSX.Element): JSX.Element | undefined {
    const { open } = this.state

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner
            onMount={this.handleMount.bind(this)}
            onUnmount={this.handleUnmount.bind(this)}
          >
            {content}
          </PortalInner>
        </Ref>
      )
    )
  }

  protected renderTrigger(trigger: JSX.Element): JSX.Element | undefined {
    return (
      trigger && (
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, { onClick: e => this.handleTriggerClick(e, trigger) })}
        </Ref>
      )
    )
  }

  protected handleMount() {
    eventStack.sub('click', this.handleDocumentClick)
    _.invoke(this.props, 'onMount', this.props)
  }

  protected handleUnmount() {
    eventStack.unsub('click', this.handleDocumentClick)
    _.invoke(this.props, 'onUnmount', this.props)
  }

  protected handlePortalRef = (portalNode: HTMLElement) => {
    this.portalNode = portalNode
  }

  protected handleTriggerRef = (triggerNode: HTMLElement) => {
    this.triggerNode = triggerNode

    _.invoke(this.props, 'triggerRef', triggerNode)
  }

  protected open = (afterRenderClbk?: Function) => {
    this.setState({ open: true }, () => afterRenderClbk && afterRenderClbk())
  }

  protected close = (afterRenderClbk?: Function) => {
    this.setState({ open: false }, () => afterRenderClbk && afterRenderClbk())
  }

  protected handleTriggerClick = (e: ReactMouseEvent, trigger) => {
    trigger && _.invoke(trigger, 'props.onClick', e, trigger.props) // Call original event handler

    this.setState({ open: !this.state.open })
  }

  protected handleDocumentClick = (e: ReactMouseEvent) => {
    if (
      !this.portalNode || // no portal
      doesNodeContainClick(this.triggerNode, e) || // event happened in trigger (delegate to trigger handlers)
      doesNodeContainClick(this.portalNode, e) // event happened in the portal
    ) {
      return // ignore the click
    }

    this.setState({ open: false })
  }
}
