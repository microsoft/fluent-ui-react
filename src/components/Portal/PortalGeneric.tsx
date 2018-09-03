import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { eventStack, doesNodeContainClick, AutoControlledComponent } from '../../lib'
import { ItemShorthand, Extendable } from 'utils'
import Ref from '../Ref'
import PortalInner from './PortalInner'

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
export class PortalGeneric<
  P extends IPortalGenericProps,
  S extends IPortalGenericState
> extends React.Component<Extendable<P>, S> {
  protected portalNode: HTMLElement
  protected triggerNode: HTMLElement
  private trigger?: JSX.Element

  protected renderPortal(content: JSX.Element): JSX.Element | undefined {
    const { open } = this.state

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner onMount={this.handleMount} onUnmount={this.handleUnmount}>
            {content}
          </PortalInner>
        </Ref>
      )
    )
  }

  protected renderTrigger(trigger: JSX.Element): JSX.Element | undefined {
    this.trigger = trigger
    return (
      trigger && (
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, { onClick: this.handleTriggerClick.bind(this) })}
        </Ref>
      )
    )
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return

    if (nextProps.hasOwnProperty('open')) {
      this.setState({ open: nextProps.open })
    }
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
    this.setState({ open: true }, () => {
      afterRenderClbk && afterRenderClbk()
    })
  }

  protected close = (afterRenderClbk?: Function) => {
    this.setState({ open: false }, () => {
      afterRenderClbk && afterRenderClbk()
    })
  }

  protected handleTriggerClick = (e: ReactMouseEvent, ...rest) => {
    _.invoke(this.trigger, 'props.onClick', e, ...rest) // Call original event handler

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
