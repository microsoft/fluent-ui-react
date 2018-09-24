import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Popper, PopperChildrenProps } from 'react-popper'
import rtlCSSJS from 'rtl-css-js'

import { childrenExist, customPropTypes, UIComponent, IRenderResultConfig } from '../../lib'
import { ItemShorthand, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import Portal from '../Portal'
import PopupContent from './PopupContent'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface IPopupProps {
  align?: Alignment
  as?: any
  basic?: boolean
  children?: ReactChildren
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: Position
  trigger?: JSX.Element
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

export interface IPopupState {
  triggerRef: HTMLElement
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

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: Portal,
    align: 'start',
    position: 'above',
  }

  public state = { triggerRef: undefined }

  public renderComponent({
    ElementType,
    classes,
    rest,
    rtl,
  }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { children, trigger } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rest}
        trigger={trigger}
        triggerRef={this.handleTriggerRef}
      >
        {childrenExist(children) ? children : this.renderContent(rtl)}
      </ElementType>
    )
  }

  private renderContent(rtl: boolean): JSX.Element {
    const { align, position } = this.props
    const triggerRef = this.state.triggerRef
    const placement = computePopupPlacement({ align, position, rtl })

    return (
      triggerRef && (
        <Popper
          placement={placement}
          referenceElement={triggerRef}
          children={this.renderPopperChildren.bind(this, rtl)}
        />
      )
    )
  }

  private renderPopperChildren = (rtl: boolean, { ref, style }: PopperChildrenProps) => {
    const { basic, content } = this.props
    const computedStyle = rtl ? rtlCSSJS(style) : style

    return (
      <Popup.Content innerRef={ref} basic={basic} {...rtl && { dir: 'rtl' }} styles={computedStyle}>
        {content}
      </Popup.Content>
    )
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => this.setState({ triggerRef })
}
