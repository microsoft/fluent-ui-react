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
import * as PropTypes from 'prop-types'

export interface SlotProps
  extends UIComponentProps<SlotProps, any>,
    ContentComponentProps,
    ChildrenComponentProps {
  /**
   * Ref callback with the input wrapper DOM node.
   *
   * @param {JSX.Element} node - input wrapper DOM node.
   */
  innerRef?: (node: HTMLElement) => void
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
    innerRef: PropTypes.func,
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
