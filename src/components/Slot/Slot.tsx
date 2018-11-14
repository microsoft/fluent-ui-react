import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, childrenExist, createShorthand } from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import createComponent from '../../lib/createComponent'
import { MapValueToProps, Props, ReactChildren } from 'types/utils'

export interface SlotProps {
  children: ReactChildren
  as?: any
  className?: string
  content?: any
  styles?: ComponentSlotStyle<SlotProps, any>
  variables?: ComponentVariablesInput
}

/**
 * A Slot is a basic component (no default styles)
 */
const Slot = createComponent<SlotProps>({
  displayName: 'Slot',

  className: 'ui-slot',

  propTypes: {
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
  },

  render(config, props) {
    const { ElementType, classes, rest } = config
    const { children, content } = props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  },
})

const createSlotFactory = (as: any, mapValueToProps: MapValueToProps) => (
  val,
  options: Props = {},
) => {
  options.defaultProps = { as, ...options.defaultProps }
  return createShorthand(Slot, mapValueToProps, val, options)
}

export const createSlot = createSlotFactory(Slot.defaultProps.as, content => ({ content }))
export const createHTMLInput = createSlotFactory('input', type => ({ type }))

export default Slot
