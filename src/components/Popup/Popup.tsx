import * as React from 'react'
import { createPortal } from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Popper, PopperChildrenProps } from 'react-popper'

import popupStateManager from './popupStateManager'

import {
  childrenExist,
  customPropTypes,
  AutoControlledComponent,
  EventStack,
  RenderResultConfig,
  isBrowser,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  Extendable,
  ReactChildren,
} from '../../../types/utils'

import Ref from '../Ref/Ref'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

import { popupBehavior } from '../../lib/accessibility'
import {
  Accessibility,
  AccessibilityActionHandlers,
  AccessibilityBehavior,
} from '../../lib/accessibility/types'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface PopupProps {
  accessibility?: Accessibility
  align?: Alignment
  children?: ReactChildren
  className?: string
  content?: ShorthandValue
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: ComponentEventHandler<PopupProps>
  position?: Position
  target?: HTMLElement
  defaultTarget?: HTMLElement
  trigger?: JSX.Element
}

export interface PopupState {
  open: boolean
  target: HTMLElement
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends AutoControlledComponent<Extendable<PopupProps>, PopupState> {
  public static displayName = 'Popup'

  public static className = 'ui-popup'

  public static Content = PopupContent

  // React bindings for autocontrolled component are introduced
  private stateManager = popupStateManager.withBindings({
    /* derives state from component */
    getState: () => {
      // AUTOCONTROLLED state logic
      // note, sloppy implementation, but just to provide an idea:
      // - 'state' that is seen by state manager could be composed from different data sources in the way necessary
      //
      // edge cases of null/undefined are not covered, but this is pretty easy implementation task
      return { ...this.state, ...this.props }
    },

    /*
    * AUTOCONTROLLED implementation for absolute match of stateManager's and component's state.
    * - this hook acts like a filter for the state changes that should be applied
    */
    // -------------
    // willSetState: ({ prevState, stateDiff, args, actionName }) => {
    //   return excludeControlledProps(stateDiff, this.props)
    // },

    setState: ({ stateDiff, prevState, newState, actionName, userArgs }) => {
      const { eventArgs } = userArgs

      // although state doesn't precisely reflect autocontrolled 'state',
      // the state of stateManager is always properly defined
      this.setState(stateDiff, () => _.invoke(this.props, 'onOpenChange', eventArgs, newState))
    },
  })

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
    content: customPropTypes.itemShorthand,

    /** Initial value for 'open'. */
    defaultOpen: PropTypes.bool,

    /** Initial value for 'target'. */
    defaultTarget: PropTypes.any,

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
     * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
     */
    position: PropTypes.oneOf(POSITIONS),

    /**
     * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
     */
    target: PropTypes.any,

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.any,
  }

  public static defaultProps: PopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    position: 'above',
  }

  public static autoControlledProps = ['open', 'target']

  private static isBrowserContext = isBrowser()

  private outsideClickSubscription = EventStack.noSubscription

  private triggerDomElement = null
  private popupDomElement = null

  protected actionHandlers: AccessibilityActionHandlers = {
    toggle: e => {
      this.stateManager.toggle({ eventArgs: e })
    },
    closeAndFocusTrigger: e => {
      this.closeAndFocusTrigger(e)
    },
  }

  private closeAndFocusTrigger = e => {
    this.stateManager.close({ eventArgs: e })
    _.invoke(this.triggerDomElement, 'focus')
  }

  private updateOutsideClickSubscription() {
    this.outsideClickSubscription.unsubscribe()

    if (this.stateManager.getState().open) {
      setTimeout(() => {
        this.outsideClickSubscription = EventStack.subscribe('click', e => {
          if (!this.popupDomElement || !this.popupDomElement.contains(e.target)) {
            this.closeAndFocusTrigger(e)
          }
        })
      })
    }
  }

  public state = { target: undefined, open: false }

  public componentDidMount() {
    this.updateOutsideClickSubscription()

    if (!this.stateManager.getState().open) {
      this.popupDomElement = null
    }
  }

  public componentDidUpdate() {
    this.updateOutsideClickSubscription()

    if (!this.stateManager.getState().open) {
      this.popupDomElement = null
    }
  }

  public componentWillUnmount() {
    this.outsideClickSubscription.unsubscribe()
  }

  public renderComponent({ rtl, accessibility }: RenderResultConfig<PopupProps>): React.ReactNode {
    const popupContent = this.renderPopupContent(rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}

        {this.stateManager.getState().open &&
          Popup.isBrowserContext &&
          popupContent &&
          createPortal(popupContent, document.body)}
      </>
    )
  }

  private renderTrigger(accessibility) {
    const { children, trigger } = this.props
    const triggerElement = childrenExist(children) ? children : (trigger as any)

    return (
      triggerElement && (
        <Ref
          innerRef={domNode => {
            this.trySetState({ target: domNode })
            this.triggerDomElement = domNode
          }}
        >
          {/* HEADS UP, critical defect was introduced by element clone (not caused by proposed changes) -
          with each new rendered element previous subscriptions are effectively 'wrapped' by new one.
          Thus, amount of processing logic DOUBlES each time trigger component is rerendered!
          Will introduce fix SHORTLY. */}
          {React.cloneElement(triggerElement, {
            onClick: e => {
              this.stateManager.toggle({ eventArgs: e })
              _.invoke(triggerElement, 'props.onClick', e)
            },
            ...accessibility.attributes.trigger,
            ...accessibility.keyHandlers.trigger,
          })}
        </Ref>
      )
    )
  }

  private renderPopupContent(rtl: boolean, accessibility: AccessibilityBehavior): JSX.Element {
    const { align, position } = this.props
    const { target } = this.state

    const placement = computePopupPlacement({ align, position, rtl })

    return (
      target && (
        <Popper
          placement={placement}
          referenceElement={target}
          children={this.renderPopperChildren.bind(this, rtl, accessibility)}
        />
      )
    )
  }

  private renderPopperChildren = (
    rtl: boolean,
    accessibility: AccessibilityBehavior,
    { ref, style: popupPlacementStyles }: PopperChildrenProps,
  ) => {
    const { content } = this.props

    return (
      <Ref
        innerRef={domElement => {
          ref(domElement)
          this.popupDomElement = domElement
        }}
      >
        {Popup.Content.create(content, {
          defaultProps: {
            ...(rtl && { dir: 'rtl' }),
            style: popupPlacementStyles,
            ...accessibility.attributes.popup,
            ...accessibility.keyHandlers.popup,
          },
        })}
      </Ref>
    )
  }
}
