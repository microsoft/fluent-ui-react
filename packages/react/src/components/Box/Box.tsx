import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import createComponent from '../../lib/createComponent'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

const Box = createComponent<WithAsProp<BoxProps>>({
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
 * A Box is an abstract component, is frequently used for slots in other Stardust components.
 * By default it renders a `div` without any styles.
 */
export default withSafeTypeForAs<typeof Box, BoxProps>(Box)
