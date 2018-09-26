import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Popper, PopperChildrenProps } from 'react-popper'

import {
  childrenExist,
  customPropTypes,
  AutoControlledComponent,
  IRenderResultConfig,
} from '../../lib'
import { ItemShorthand, Extendable, ReactChildren } from '../../../types/utils'
import Ref from '../Ref'
import computePopupPlacement, { Alignment, Position } from './positioningHelper'

import PopupContent from './PopupContent'

const POSITIONS: Position[] = ['above', 'below', 'before', 'after']
const ALIGNMENTS: Alignment[] = ['top', 'bottom', 'start', 'end', 'center']

export interface IPopupProps {
  align?: Alignment
  children?: ReactChildren
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  open?: boolean
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
    /** Alignment for the popup. */
    align: PropTypes.oneOf(ALIGNMENTS),

    /** The popup content (deprecated). */
    children: PropTypes.any, // customPropTypes.disallow(['children']),

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The popup content. */
    content: PropTypes.any,

    open: PropTypes.bool,

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

  public static handledProps = [
    'align',
    'children',
    'className',
    'content',
    'open',
    'position',
    'styles',
    'trigger',
    'variables',
  ]

  public static defaultProps = {
    align: 'start',
    position: 'above',
  }

  public static autoControlledProps = ['open']

  public state = { triggerRef: undefined }

  public renderComponent({ rtl }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { children, content, trigger } = this.props

    return (
      <>
        <Ref
          innerRef={domNode => {
            this.setState({ triggerRef: domNode })
          }}
        >
          {childrenExist(children) ? children : trigger}
        </Ref>
        {this.props.open && this.renderPopupContent(rtl)}
      </>
    )
  }

  private renderPopupContent(rtl: any): JSX.Element {
    const { align, position } = this.props
    const triggerRef = this.state.triggerRef

    const placement = computePopupPlacement({ align, position, rtl })

    return (
      triggerRef && (
        <Popper
          placement={placement}
          referenceElement={triggerRef}
          children={this.renderPopperChildren.bind(this)}
        />
      )
    )
  }

  private renderPopperChildren = ({
    ref,
    style: popupPlacementStyles,
    placement,
  }: PopperChildrenProps) => {
    const { content } = this.props

    return (
      <Ref
        innerRef={domElement => {
          ref(domElement)
        }}
      >
        <Popup.Content style={popupPlacementStyles} data-placement={placement}>
          {content}
        </Popup.Content>
      </Ref>
    )
  }
}
