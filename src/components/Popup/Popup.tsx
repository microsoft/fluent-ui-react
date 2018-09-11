import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'
import { Placement } from 'popper.js'
import rtlCSSJS from 'rtl-css-js'

import { childrenExist, customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ItemShorthand, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from 'theme'
import Portal from '../Portal'
import PopupContent from './PopupContent'
import { PopupBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface IPopupProps {
  align?: Alignment
  as?: any
  accessibility?: Accessibility
  basic?: boolean
  children?: ReactChildren
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: Position
  trigger?: JSX.Element
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
  onOpen?: (props: IPopupProps) => void
  onClose?: (props: IPopupProps) => void
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

    /** Position for the popup. */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /**
     * Called when popup is opened.
     *
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called when popup is closed.
     *
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,
  }

  public static handledProps = [
    'accessibility',
    'align',
    'as',
    'basic',
    'children',
    'className',
    'content',
    'onOpen',
    'onClose',
    'position',
    'styles',
    'trigger',
    'variables',
  ]

  public static defaultProps = {
    as: Portal,
    position: 'top-start',
    align: 'start',
    accessibility: PopupBehavior as Accessibility,
  }

  public state = { triggerRef: undefined, popupOpened: false }

  actionHandlers: AccessibilityActionHandlers = {
    open: e => this.openPopup(e),
    close: e => this.closePopup(e),
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    rest,
    rtl,
  }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { children, trigger, position, align } = this.props
    const popupAccessibility = {
      ...accessibility.attributes.popup,
      ...accessibility.keyHandlers.popup,
    }
    const triggerAccessibility = {
      ...accessibility.attributes.trigger,
      ...accessibility.keyHandlers.trigger,
    }

    return (
      <ElementType
        className={classes.root}
        {...rest}
        open={this.state.popupOpened}
        onTriggerClick={this.onTriggerClick}
        trigger={trigger}
        triggerRef={this.handleTriggerRef}
        triggerAccessibility={triggerAccessibility}
        onOutsideClick={this.closePopup}
        onMount={this.onOpen}
        onUnmount={this.onClose}
      >
        {childrenExist(children)
          ? children
          : this.renderContent(
              computePopupPlacement({ align, position, rtl }),
              this.renderPopperChildren.bind(this, rtl, popupAccessibility),
            )}
      </ElementType>
    )
  }

  private renderContent(popupPlacement: Placement, renderChildrenCb: any): JSX.Element {
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
    popupAccessibility: any,
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
        {...popupAccessibility}>
        {content}
      </Popup.Content>
    )
  }

  private onTriggerClick = () => {
    this.setState({ popupOpened: !this.state.popupOpened })
  }

  private openPopup = (e: Event) => {
    e.preventDefault()
    this.setState({ popupOpened: true })
  }

  private closePopup = (e: Event) => {
    e.preventDefault()
    this.setState({ popupOpened: false })
  }

  private onOpen = () => {
    _.invoke(this.props, 'onOpen', this.props)
  }

  private onClose = () => {
    _.invoke(this.props, 'onClose', this.props)
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => this.setState({ triggerRef })
}
