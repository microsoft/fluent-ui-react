import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
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
import Ref from '../Ref/Ref'

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentComponentProps,
    ChildrenComponentProps {
  slotRef: React.Ref<any>
}

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
    ...contentComponentPropsTypes,
    ...childrenComponentPropTypes,
    slotRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  },

  render(config, props) {
    const { ElementType, classes, rest } = config
    const { children, content } = props

    return (
      <Ref
        innerRef={(slotNode: HTMLElement) => {
          _.invoke(props, 'slotRef', slotNode)
        }}
      >
        <ElementType {...rest} className={classes.root}>
          {childrenExist(children) ? children : content}
        </ElementType>
      </Ref>
    )
  },
})

Slot.create = createShorthandFactory(Slot)

export default Slot
