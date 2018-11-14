import * as React from 'react'
import { childrenExist, createShorthandFactory } from '../../lib'
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
import createComponent, { CreateComponentReturnType } from '../../lib/createComponent'

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentComponentProps,
    ChildrenComponentProps {}

/**
 * A Slot is a basic component (no default styles)
 */
const Slot: CreateComponentReturnType<SlotProps> & {
  createHTMLElement?: Function
} = createComponent<SlotProps>({
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

Slot.createHTMLElement = createShorthandFactory(Slot) // TODO: fix types
Slot.create = createShorthandFactory(Slot, 'content')

export default Slot
