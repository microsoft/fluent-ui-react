import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  childrenExist,
  AutoControlledComponent,
  doesNodeContainClick,
  EventStack,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../lib'
import Ref from '../Ref/Ref'
import PortalInner from './PortalInner'
import { FocusTrapZone, FocusTrapZoneProps } from '../../lib/accessibility/FocusZone'
import { AccessibilityAttributes, OnKeyDownHandler } from '../../lib/accessibility/types'
import { ReactPropsStrict } from '../../../types/utils'

type ReactMouseEvent = React.MouseEvent<HTMLElement>
export type TriggerAccessibility = {
  attributes?: AccessibilityAttributes
  keyHandlers?: OnKeyDownHandler
}

export interface PortalProps extends ChildrenComponentProps, ContentComponentProps {
  /** Initial value of open. */
  defaultOpen?: boolean

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {object} data - All props.
   */
  onMount?: (props: PortalProps) => void

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {object} data - All props.
   */
  onUnmount?: (props: PortalProps) => void

  /** Controls whether or not the portal is displayed. */
  open?: boolean

  /** Element to be rendered in-place where the portal is defined. */
  trigger?: JSX.Element

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value */
  trapFocus?: FocusTrapZoneProps | boolean

  /** Accessibility behavior object to apply on trigger node. */
  triggerAccessibility?: TriggerAccessibility

  /**
   * Called with a ref to the trigger node.
   *
   * @param {JSX.Element} node - Referred node.
   */
  triggerRef?: (node: HTMLElement) => void

  /**
   * Called when trigger node was clicked.
   *
   * @param {object} data - All props.
   */
  onTriggerClick?: (e: ReactMouseEvent) => void

  /**
   * Called when `click` event was invoked outside portal or trigger nodes.
   *
   * @param {object} data - All props.
   */
  onOutsideClick?: (e: ReactMouseEvent) => void
}

export interface PortalState {
  open?: boolean
}

/**
 * A component that allows you to render children outside their parent.
 */
class Portal extends AutoControlledComponent<ReactPropsStrict<PortalProps>, PortalState> {
  private portalNode: HTMLElement
  private triggerNode: HTMLElement

  private clickSubscription = EventStack.noSubscription

  public static autoControlledProps = ['open']

  public static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: false,
      className: false,
      styled: false,
    }),
    defaultOpen: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    open: PropTypes.bool,
    trigger: PropTypes.node,
    triggerRef: PropTypes.func,
    triggerAccessibility: PropTypes.object,
    onTriggerClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
    const { children, content, trapFocus } = this.props
    const { open } = this.state
    const contentToRender = childrenExist(children) ? children : content
    const focusTrapZoneProps = (_.keys(trapFocus).length && trapFocus) || {}

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner
            onMount={this.handleMount}
            onUnmount={this.handleUnmount}
            {...rtlTextContainer.getAttributes({ forElements: [contentToRender] })}
          >
            {trapFocus ? (
              <FocusTrapZone {...focusTrapZoneProps}>{contentToRender}</FocusTrapZone>
            ) : (
              contentToRender
            )}
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
    this.clickSubscription = EventStack.subscribe('click', this.handleDocumentClick)

    _.invoke(this.props, 'onMount', this.props)
  }

  private handleUnmount = () => {
    this.clickSubscription.unsubscribe()
    _.invoke(this.props, 'onUnmount', this.props)
  }

  private handlePortalRef = (portalNode: HTMLElement) => {
    this.portalNode = portalNode
  }

  private handleTriggerRef = (triggerNode: HTMLElement) => {
    this.triggerNode = triggerNode

    _.invoke(this.props, 'triggerRef', triggerNode)
  }

  private handleTriggerClick = (e: ReactMouseEvent, ...unhandledProps) => {
    const { trigger } = this.props

    _.invoke(this.props, 'onTriggerClick', e) // Call handler from parent component
    _.invoke(trigger, 'props.onClick', e, ...unhandledProps) // Call original event handler
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
