import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  addRtlSupport,
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
    const { ElementType, classes, unhandledProps, accessibility } = config
    const { children, content } = props

    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        {addRtlSupport(childrenExist(children) ? children : content)}
      </ElementType>
    )
  },
})

Box.create = createShorthandFactory(Box)

export default Box
