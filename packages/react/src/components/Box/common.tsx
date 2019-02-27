import * as React from 'react'

import {
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'

import cx from 'classnames'

export const BoxClassName = 'ui-box'

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

export const renderBox = ({ ElementType, unhandledProps, classes, children, content }) => (
  <ElementType
    {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
    {...unhandledProps}
    className={cx(BoxClassName, classes.root)}
  >
    {childrenExist(children) ? children : content}
  </ElementType>
)
