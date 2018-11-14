import * as React from 'react'
import { childrenExist, createShorthand } from '../../lib'
import {
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  contentComponentPropsTypes,
  childrenComponentPropTypes,
} from '../../lib/commonPropTypes'
import createComponent from '../../lib/createComponent'
import { MapValueToProps, Props } from 'types/utils'

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentComponentProps,
    ChildrenComponentProps {}

/**
 * A Slot is a basic component (no default styles)
 */
const Slot = createComponent<SlotProps>({
  displayName: 'Slot',

  className: 'ui-slot',

  propTypes: {
    ...commonUIComponentPropTypes,
    ...contentComponentPropsTypes,
    ...childrenComponentPropTypes,
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
