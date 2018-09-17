import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Popper, PopperChildrenProps } from 'react-popper'
import rtlCSSJS from 'rtl-css-js'

import { childrenExist, customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ItemShorthand, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import Portal from '../Portal'
import PopupContent from './PopupContent'
import { PopupBehavior } from '../../lib/accessibility'
import {
  Accessibility,
  AccessibilityActionHandlers,
  IAccessibilityBehavior,
} from '../../lib/accessibility/interfaces'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface IPopupProps {
  accessibility?: Accessibility
  align?: Alignment
  as?: any
  basic?: boolean
  children?: ReactChildren
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: Position
  trigger?: JSX.Element
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

export interface IPopupState {
  triggerRef: HTMLElement
  popupOpened?: boolean
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends UIComponent<Extendable<IPopupProps>, IPopupState> {
  public static displayName = 'Popup'

  public static className = 'ui-popup'

  public static Content = PopupContent

  public static propTypes = {
    /** Alignment for the popup. */
    align: PropTypes.oneOf(ALIGNMENTS),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Basic CSS styling for the popup. */
    basic: PropTypes.bool,

    /** The popup content (deprecated). */
    children: customPropTypes.disallow(['children']),

    /** Additional classes. */
    className: PropTypes.string,

    /** The popup content. */
    content: customPropTypes.itemShorthand,

    /**
     * Position for the popup. Position has higher priority than align. If position is vertical ('above' | 'below')
     * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
     * and 'start' | 'end' respectively), we ignore the value set for align and make it 'center'.
     * This is the mechanism we chose for dealing with mismatched prop values.
     */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'accessibility',
    'align',
    'as',
    'basic',
    'children',
    'className',
    'content',
    'position',
    'styles',
    'trigger',
    'variables',
  ]

  public static defaultProps = {
    as: Portal,
    align: 'start',
    position: 'above',
    accessibility: PopupBehavior as Accessibility,
  }

  public state = { triggerRef: undefined, popupOpened: false }

  actionHandlers: AccessibilityActionHandlers = {
    open: e => this.openPopup(e),
    close: e => this.closePopup(e),
    closeAndFocusTrigger: e => this.closePopup(e, this.focusTrigger),
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    rest,
    rtl,
  }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { children, trigger, position, align } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rest}
        open={this.state.popupOpened}
        trigger={trigger}
        triggerRef={this.handleTriggerRef}
        triggerAccessibility={{
          ...accessibility.attributes.trigger,
          ...accessibility.keyHandlers.trigger,
        }}
        onOutsideClick={this.closePopup}
        onTriggerClick={this.onTriggerClick}
      >
        {childrenExist(children)
          ? children
          : this.renderContent(
              computePopupPlacement({ align, position, rtl }),
              this.renderPopperChildren.bind(this, rtl, accessibility),
            )}
      </ElementType>
    )
  }

  private renderContent(
    popupPlacement: Placement,
    renderChildrenCb: (props: PopperChildrenProps) => React.ReactNode,
  ): JSX.Element {
    const triggerRef = this.state.triggerRef

    return (
      triggerRef && (
        <Popper
          placement={popupPlacement}
          referenceElement={triggerRef}
          children={renderChildrenCb}
        />
      )
    )
  }

  private renderPopperChildren = (
    rtl: boolean,
    accessibility: IAccessibilityBehavior,
    { ref, style }: PopperChildrenProps,
  ) => {
    const { basic, content } = this.props
    const computedStyle = rtl ? rtlCSSJS(style) : style

    return (
      <Popup.Content
        innerRef={ref}
        basic={basic}
        {...rtl && { dir: 'rtl' }}
        styles={{ root: computedStyle }}
        {...accessibility.attributes.popup}
        {...accessibility.keyHandlers.popup}
      >
        {content}
      </Popup.Content>
    )
  }

  private onTriggerClick = () => {
    this.setState({ popupOpened: !this.state.popupOpened })
  }

  private openPopup = (e: Event, afterRenderCb?: () => void) => {
    e.preventDefault()
    this.setState({ popupOpened: true }, () => afterRenderCb && afterRenderCb())
  }

  private closePopup = (e: Event, afterRenderCb?: () => void) => {
    e.preventDefault()
    this.setState({ popupOpened: false }, () => afterRenderCb && afterRenderCb())
  }

  private focusTrigger = () => {
    const triggerRef = this.state.triggerRef
    triggerRef && triggerRef.focus()
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => this.setState({ triggerRef })
}
