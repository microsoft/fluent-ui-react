import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentNodeComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
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
    ...commonPropTypes.commonUIComponentPropTypes,
    ...commonPropTypes.contentNodeComponentPropsTypes,
    ...commonPropTypes.childrenComponentPropTypes,
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
