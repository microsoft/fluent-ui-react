import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  customPropTypes,
  UIComponent,
  childrenExist,
  RenderResultConfig,
  createShorthand,
} from '../../lib'
import { Extendable, MapValueToProps, Props } from '../../../types/utils'
import { UIComponentProps } from '../../lib/UIComponent'

export interface SlotProps extends UIComponentProps<SlotProps, any> {
  /** Shorthand for primary content. */
  content?: any
}

export const createSlotFactory = (as: any, mapValueToProps: MapValueToProps) => (
  val,
  options: Props = {},
) => {
  options.defaultProps = { as, ...options.defaultProps }
  return createShorthand(Slot, mapValueToProps, val, options)
}

/**
 * A Slot is a basic component (no default styles)
 */
class Slot extends UIComponent<Extendable<SlotProps>, any> {
  static className = 'ui-slot'

  static displayName = 'Slot'

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    content: PropTypes.any,
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  static create = createSlotFactory(Slot.defaultProps.as, content => ({ content }))
  static createHTMLInput = createSlotFactory('input', type => ({ type }))

  renderComponent({ ElementType, classes, rest }: RenderResultConfig<SlotProps>) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Slot
