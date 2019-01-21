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

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

/**
 * A Box is a basic component (no default styles)
 */
const Box: CreateComponentReturnType<ReactProps<BoxProps>> = createComponent<BoxProps>({
  displayName: 'Box',

  className: 'ui-box',

  propTypes: {
    ...commonPropTypes.createCommon(),
  },

  render(config, props) {
    const { ElementType, classes, unhandledProps, rtlAttributes } = config
    const { children, content } = props

    return (
      <ElementType {...rtlAttributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  },
})

Box.create = createShorthandFactory(Box)

export default Box
