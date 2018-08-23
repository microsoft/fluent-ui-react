import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import CSSProperties = React.CSSProperties

import Portal from '../Portal'
import {
  childrenExist,
  customPropTypes,
  makeDebugger,
  UIComponent,
  IRenderResultConfig,
} from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { ItemShorthand, Extendable } from '../../../types/utils'

type PopupPosition =
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'start center'
  | 'end center'
  | 'top center'
  | 'bottom center'

const debug = makeDebugger('*')
const POSITIONS: PopupPosition[] = [
  'top start',
  'top end',
  'bottom start',
  'bottom end',
  'start center',
  'end center',
  'top center',
  'bottom center',
]

export interface IPopupProps {
  as?: any
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: PopupPosition
  styles?: IComponentPartStylesInput
  trigger?: JSX.Element
  variables?: ComponentVariablesInput
}

export interface IPopupState {
  position?: PopupPosition
  style?: CSSProperties
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends UIComponent<Extendable<IPopupProps>, IPopupState> {
  private triggerRef: HTMLElement
  private popupCoords: ClientRect | DOMRect | undefined

  public static displayName = 'Popup'
  public static className = 'ui-popup'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Simple text content for the popover. */
    content: customPropTypes.itemShorthand,

    /** Position for the popover. */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'accessibility',
    'as',
    'children',
    'className',
    'content',
    'style',
    'styles',
    'trigger',
    'variables',
  ]

  public static defaultProps = {
    position: 'top start',
  }

  public state = {
    position: undefined,
    style: {},
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    debug(`renderComponent`)

    const { children, content, trigger } = this.props
    const style = { ...this.state.style, ...this.props.style }

    const popupJSX = (
      <ElementType className={classes.root} ref={this.handlePopupRef} style={style} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )

    return (
      <Portal onMount={this.handlePortalMount} trigger={trigger} triggerRef={this.handleTriggerRef}>
        {popupJSX}
      </Portal>
    )
  }

  private computePopupStyle(position: PopupPosition): CSSProperties {
    debug(`computePopupStyle`)

    const style: CSSProperties = {}
    const popupCoords = this.popupCoords
    if (!popupCoords) {
      return style
    }

    const context = this.getContext()
    const coords = context && context.getBoundingClientRect()
    if (!coords) {
      return style
    }

    const { pageYOffset, pageXOffset } = window
    const { clientWidth, clientHeight } = document.documentElement

    if (_.includes(position, 'end')) {
      style.left = 'auto'
      style.right = Math.round(clientWidth - (coords.right + pageXOffset))
    } else if (_.includes(position, 'start')) {
      style.left = Math.round(coords.left + pageXOffset)
      style.right = 'auto'
    } else {
      // if not start nor end, we are horizontally centering the element
      const xOffset = (coords.width - popupCoords.width) / 2
      style.left = Math.round(coords.left + xOffset + pageXOffset)
      style.right = 'auto'
    }

    if (_.includes(position, 'top')) {
      style.top = 'auto'
      style.bottom = Math.round(clientHeight - (coords.top + pageYOffset))
    } else if (_.includes(position, 'bottom')) {
      style.top = Math.round(coords.bottom + pageYOffset)
      style.bottom = 'auto'
    } else {
      // if not top nor bottom, we are vertically centering the element
      const yOffset = (coords.height + popupCoords.height) / 2
      style.top = Math.round(coords.bottom + pageYOffset - yOffset)
      style.bottom = 'auto'

      const xOffset = popupCoords.width
      if (_.includes(position, 'end')) {
         (style.right as number) -= xOffset
      } else {
         (style.left as number) -= xOffset
      }
    }

    // Append 'px' to every numerical values in the style
    return {
      ..._.mapValues(style, value => (_.isNumber(value) ? `${value}px` : value)),
      position: 'absolute',
      zIndex: 2,
    }
  }

  private setPopupStyle() {
    debug(`setPopupStyle()`)

    const { position } = this.props
    const style = this.computePopupStyle(position!)

    if (!_.isEmpty(style)) {
      debug(`setPopupStyle() CALLED`)
      this.setState({ style, position })
    }
  }

  private handlePortalMount = () => {
    debug('handlePortalMount()')

    this.setPopupStyle()
  }

  private handlePopupRef = (popupRef: HTMLElement) => {
    debug(`handlePopupRef(${popupRef})`)

    this.popupCoords = popupRef && popupRef.getBoundingClientRect()
    this.setPopupStyle()
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => {
    debug(`handleTriggerRef(${triggerRef})`)

    this.triggerRef = triggerRef
  }

  private getContext = (): HTMLElement => this.triggerRef
}
