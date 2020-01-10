import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils'
import createComponentInternal from '../../utils/createComponentInternal'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

const Box = createComponentInternal<WithAsProp<BoxProps>>({
  displayName: 'Box',

  className: 'ui-box',

  propTypes: {
    ...commonPropTypes.createCommon(),
  },

  render(config, props) {
    const { ElementType, classes, unhandledProps } = config
    const { children, content } = props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  },
})

Box.create = createShorthandFactory({ Component: Box })

/**
 * A Box is a basic component, commonly used for slots in other Fluent UI components.
 * By default it just renders a `div`.
 */
export default withSafeTypeForAs<typeof Box, BoxProps>(Box)
