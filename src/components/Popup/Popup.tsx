import * as React from 'react'
import { createPortal } from 'react-dom'
import * as PropTypes from 'prop-types'
import _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'

import { childrenExist, AutoControlledComponent, IRenderResultConfig, isBrowser } from '../../lib'
import {
  ComponentEventHandler,
  ItemShorthand,
  Extendable,
  ReactChildren,
} from '../../../types/utils'

import Ref from '../Ref'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

import { popupBehavior } from '../../lib/accessibility'
import {
  Accessibility,
  AccessibilityActionHandlers,
  IAccessibilityBehavior,
} from '../../lib/accessibility/interfaces'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface IPopupProps {
  accessibility?: Accessibility
  align?: Alignment
  children?: ReactChildren
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: ComponentEventHandler<IPopupProps>
  position?: Position
  trigger?: JSX.Element
}

export interface IPopupState {
  triggerRef: HTMLElement
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends AutoControlledComponent<Extendable<IPopupProps>, IPopupState> {
  public static displayName = 'Popup'

  public static className = 'ui-popup'

  public static Content = PopupContent

  public static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Alignment for the popup. */
    align: PropTypes.oneOf(ALIGNMENTS),

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The popup content. */
    content: PropTypes.any,

    /** Initial value for 'open'. */
    defaultOpen: PropTypes.bool,

    /** Defines whether popup is displayed. */
    open: PropTypes.bool,

    /**
     * Event for request to change 'open' value.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onOpenChange: PropTypes.func,

    /**
     * Position for the popup. Position has higher priority than align. If position is vertical ('above' | 'below')
     * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
     * and 'start' | 'end' respectively), we ignore the value set for align and make it 'center'.
     * This is the mechanism we chose for dealing with mismatched prop values.
     */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,
  }

  public static defaultProps: IPopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    position: 'above',
  }

  public static autoControlledProps = ['open']

  private static isBrowserContext = isBrowser()

  protected actionHandlers: AccessibilityActionHandlers = {
    toggle: e =>
      _.invoke(this.props, 'onOpenChange', e, { ...this.props, ...{ open: !this.props.open } }),
    closeAndFocusTrigger: e => {
      if (this.props.onOpenChange) {
        _.invoke(this.props, 'onOpenChange', e, { ...this.props, ...{ open: false } })
        _.invoke(this.state.triggerRef, 'focus')
      }
    },
  }

  public state = { triggerRef: undefined }

  public renderComponent({
    rtl,
    accessibility,
  }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { children, trigger, open } = this.props

    return (
      <>
        <Ref
          innerRef={domNode => {
            this.setState({ triggerRef: domNode })
          }}
        >
          {React.cloneElement(childrenExist(children) ? children : (trigger as any), {
            ...accessibility.attributes.trigger,
            ...accessibility.keyHandlers.trigger,
          })}
        </Ref>
        {open &&
          Popup.isBrowserContext &&
          createPortal(this.renderPopupContent(rtl, accessibility), document.body)}
      </>
    )
  }

  private renderPopupContent(rtl: boolean, accessibility: IAccessibilityBehavior): JSX.Element {
    const { align, position } = this.props
    const triggerRef = this.state.triggerRef

    const placement = computePopupPlacement({ align, position, rtl })

    return (
      triggerRef && (
        <Popper
          placement={placement}
          referenceElement={triggerRef}
          children={this.renderPopperChildren.bind(this, rtl, accessibility)}
        />
      )
    )
  }

  private renderPopperChildren = (
    rtl: boolean,
    accessibility: IAccessibilityBehavior,
    { ref, style: popupPlacementStyles }: PopperChildrenProps,
  ) => {
    const { content } = this.props

    return (
      <Ref innerRef={domElement => ref(domElement)}>
        <Popup.Content
          {...rtl && { dir: 'rtl' }}
          style={popupPlacementStyles}
          {...accessibility.attributes.popup}
          {...accessibility.keyHandlers.popup}
        >
          {content}
        </Popup.Content>
      </Ref>
    )
  }
}
