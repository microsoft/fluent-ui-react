import * as React from 'react'
import { UIComponent, childrenExist, RenderResultConfig, createShorthand } from '../../lib'
import { Extendable, MapValueToProps, Props } from '../../../types/utils'
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

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentComponentProps,
    ChildrenComponentProps {}

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
    ...commonUIComponentPropTypes,
    ...contentComponentPropsTypes,
    ...childrenComponentPropTypes,
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
