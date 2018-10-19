import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  childrenExist,
  customPropTypes,
  AutoControlledComponent,
  eventStack,
  doesNodeContainClick,
} from '../../lib'
import { ShorthandValue, ReactChildren } from '../../../types/utils'
import Ref from '../Ref/Ref'
import PortalInner from './PortalInner'
import { AccessibilityAttributes, OnKeyDownHandler } from '../../lib/accessibility/interfaces'

type ReactMouseEvent = React.MouseEvent<HTMLElement>
export type TriggerAccessibility = {
  attributes?: AccessibilityAttributes
  keyHandlers?: OnKeyDownHandler
}

export interface PortalProps {
  children?: ReactChildren
  content?: ShorthandValue | ShorthandValue[]
  defaultOpen?: boolean
  onMount?: (props: PortalProps) => void
  onUnmount?: (props: PortalProps) => void
  open?: boolean
  trigger?: JSX.Element
  triggerAccessibility?: TriggerAccessibility
  triggerRef?: (node: HTMLElement) => void
  onTriggerClick?: (e: ReactMouseEvent) => void
  onOutsideClick?: (e: ReactMouseEvent) => void
}

export interface PortalState {
  open?: boolean
}

/**
 * A component that allows you to render children outside their parent.
 */
class Portal extends AutoControlledComponent<PortalProps, PortalState> {
  private portalNode: HTMLElement
  private triggerNode: HTMLElement

  public static autoControlledProps = ['open']

  public static propTypes = {
    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Initial value of open. */
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

    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /**
     * Called with a ref to the trigger node.
     *
     * @param {JSX.Element} node - Referred node.
     */
    triggerRef: PropTypes.func,

    /** Accessibility behavior object to apply on trigger node. */
    triggerAccessibility: PropTypes.object,

    /**
     * Called when trigger node was clicked.
     *
     * @param {object} data - All props.
     */
    onTriggerClick: PropTypes.func,

    /**
     * Called when `click` event was invoked outside portal or trigger nodes.
     *
     * @param {object} data - All props.
     */
    onOutsideClick: PropTypes.func,
  }

  public static defaultProps: PortalProps = {
    triggerAccessibility: {},
  }

  public renderComponent(): React.ReactNode {
    return (
      <React.Fragment>
        {this.renderPortal()}
        {this.renderTrigger()}
      </React.Fragment>
    )
  }

  private renderPortal(): JSX.Element | undefined {
    const { children, content } = this.props
    const { open } = this.state

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner onMount={this.handleMount} onUnmount={this.handleUnmount}>
            {childrenExist(children) ? children : content}
          </PortalInner>
        </Ref>
      )
    )
  }

  private renderTrigger(): JSX.Element | undefined {
    const { trigger, triggerAccessibility } = this.props

    return (
      trigger && (
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: this.handleTriggerClick,
            ...triggerAccessibility.attributes,
            ...triggerAccessibility.keyHandlers,
          })}
        </Ref>
      )
    )
  }
  private handleMount = () => {
    eventStack.sub('click', this.handleDocumentClick)
    _.invoke(this.props, 'onMount', this.props)
  }

  private handleUnmount = () => {
    eventStack.unsub('click', this.handleDocumentClick)
    _.invoke(this.props, 'onUnmount', this.props)
  }

  private handlePortalRef = (portalNode: HTMLElement) => {
    this.portalNode = portalNode
  }

  private handleTriggerRef = (triggerNode: HTMLElement) => {
    this.triggerNode = triggerNode

    _.invoke(this.props, 'triggerRef', triggerNode)
  }

  private handleTriggerClick = (e: ReactMouseEvent, ...rest) => {
    const { trigger } = this.props

    _.invoke(this.props, 'onTriggerClick', e) // Call handler from parent component
    _.invoke(trigger, 'props.onClick', e, ...rest) // Call original event handler
    this.trySetState({ open: !this.state.open })
  }

  private handleDocumentClick = (e: ReactMouseEvent) => {
    if (
      !this.portalNode || // no portal
      doesNodeContainClick(this.triggerNode, e) || // event happened in trigger (delegate to trigger handlers)
      doesNodeContainClick(this.portalNode, e) // event happened in the portal
    ) {
      return // ignore the click
    }
    _.invoke(this.props, 'onOutsideClick', e)
    this.trySetState({ open: false })
  }
}

export default Portal
