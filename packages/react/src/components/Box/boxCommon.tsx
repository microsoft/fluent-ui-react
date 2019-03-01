import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  commonPropTypes,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'

import cx from 'classnames'
import { ThemePrepared } from 'src/themes/types'

export const BoxClassName = 'ui-box'

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  theme?: ThemePrepared
}

export const boxPropTypes = {
  ...commonPropTypes.createCommon(),
  theme: PropTypes.any,
}

export const handledBoxProps = Object.keys(boxPropTypes)

export const renderBox = ({
  ElementType,
  unhandledProps,
  classes,
  children,
  content,
}): React.ReactElement<BoxProps> => (
  <ElementType
    {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
    {...unhandledProps}
    className={cx(BoxClassName, classes.root)}
  >
    {childrenExist(children) ? children : content}
  </ElementType>
)
