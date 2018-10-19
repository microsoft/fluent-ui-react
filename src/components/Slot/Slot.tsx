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
import { ComponentVariablesInput, ComponentSlotStyle } from '../../../types/theme'

export interface SlotProps {
  as?: any
  className?: string
  content?: any
  styles?: ComponentSlotStyle<SlotProps, any>
  variables?: ComponentVariablesInput
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
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
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
