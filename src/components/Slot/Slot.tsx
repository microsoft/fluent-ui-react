import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import createComponent, { CreateComponentReturnType } from '../../lib/createComponent'
import { ReactProps } from '../../../types/utils'

export interface SlotProps
  extends UIComponentProps<SlotProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

/**
 * A Slot is a basic component (no default styles)
 */
const Slot: CreateComponentReturnType<ReactProps<SlotProps>> & {
  create?: Function
} = createComponent<SlotProps>({
  displayName: 'Slot',

  className: 'ui-slot',

  propTypes: {
    ...commonPropTypes.createCommon(),
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
