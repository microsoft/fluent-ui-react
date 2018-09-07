import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { eventStack, doesNodeContainClick, AutoControlledComponent } from '.'
import { Extendable } from 'utils'
import Ref from '../components/Ref'
import PortalInner from '../components/Portal/PortalInner'

import { FocusTrapZone } from './accessibility/FocusZone/FocusTrapZone'

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

  private getInitialAutoControlledState() {
    return { open: false }
  }

  private hideContentFromAccessibilityTree() {
    // if (!this.portalNode) return

    // let current = document.body

    // while(current !== this.portalNode) {
    //     for (let index = 0; index < current.children.length; index++) {
    //       const element = current.children[index] as HTMLElement;

    //       if (!element.contains(this.portalNode)) {
    //         element.setAttribute('aria-hidden', 'true')
    //       }
    //       else {
    //         current = element
    //       }
    //     }
    // }

    const elements = document.body.children

    for (let index = 0; index < elements.length - 1; index++) {
      const element = elements[index]

      if (element.nodeName !== 'SCRIPT' && element.nodeName !== 'STYLE') {
        element.setAttribute('aria-hidden', 'true')
        element.setAttribute('acc-hidden', 'true')
      }
    }
  }

  private showContentInAccessibilityTree() {
    const hiddenElements = document.querySelectorAll('[acc-hidden="true"]')
    for (let index = 0; index < hiddenElements.length; index++) {
      const element = hiddenElements[index]
      element.removeAttribute('aria-hidden')
      element.removeAttribute('acc-hidden')
    }
  }

  protected renderPortal(content: JSX.Element): JSX.Element | undefined {
    const { open } = this.state

    !open && this.showContentInAccessibilityTree()

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner
            onMount={this.handleMount.bind(this)}
            onUnmount={this.handleUnmount.bind(this)}
          >
            <FocusTrapZone
              isClickableOutsideFocusTrap={true}
              forceFocusInsideTrap={false}
              elementToFocusOnDismiss={null}
              disableFirstFocus={false}
            >
              {content}
            </FocusTrapZone>
          </PortalInner>
        </Ref>
      )
    )
  }

  protected renderTrigger(trigger: JSX.Element, attributes?: any): JSX.Element | undefined {
    return (
      trigger && (
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: e => this.handleTriggerClick(e, trigger),
            ...attributes,
          })}
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
    this.hideContentFromAccessibilityTree()
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

    this.state.open ? this.close() : this.open()
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
