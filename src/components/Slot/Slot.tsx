import * as React from 'react'
import { childrenExist, createShorthandFactory } from '../../lib'
import {
  UIComponentProps,
  ContentNodeComponentProps,
  ChildrenComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  contentNodeComponentPropsTypes,
  childrenComponentPropTypes,
} from '../../lib/commonPropTypes'
import createComponent, { CreateComponentReturnType } from '../../lib/createComponent'

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentNodeComponentProps,
    ChildrenComponentProps {}

/**
 * A Slot is a basic component (no default styles)
 */
const Slot: CreateComponentReturnType<SlotProps> & {
  create?: Function
} = createComponent<SlotProps>({
  displayName: 'Slot',

  className: 'ui-slot',

  propTypes: {
    ...commonUIComponentPropTypes,
    ...contentNodeComponentPropsTypes,
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

Slot.create = createShorthandFactory(Slot)

export default Slot
