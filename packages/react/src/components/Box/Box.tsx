import { getElementType, getUnhandledProps, useStyles } from '@fluentui/react-bindings'
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
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface BoxProps
  extends UIComponentProps<BoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

// const Box = createComponentInternal<WithAsProp<BoxProps>>({
//   displayName: 'Box',
//
//   className: 'ui-box',
//
//   propTypes: {
//     ...commonPropTypes.createCommon(),
//   },
//
//   render(config, props) {
//     const { ElementType, classes, unhandledProps } = config
//     const { children, content } = props
//
//     return (
//       <ElementType
//         {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
//         {...unhandledProps}
//         className={classes.root}
//       >
//         {childrenExist(children) ? children : content}
//       </ElementType>
//     )
//   },
// })

const Box: React.FC<WithAsProp<BoxProps>> = props => {
  const { children, className, content, design, styles, variables } = props

  const [classes] = useStyles('Box', {
    className: Box.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
  })

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(Object.keys(Box.propTypes) as any, props)

  return (
    <ElementType
      {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
      {...unhandledProps}
      className={classes.root}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  )
}

Box.create = createShorthandFactory({ Component: Box })
Box.className = 'ui-box'
Box.propTypes = {
  ...commonPropTypes.createCommon(),
}

/**
 * A Box is a basic component, commonly used for slots in other Fluent UI components.
 * By default it just renders a `div`.
 */
export default withSafeTypeForAs<typeof Box, BoxProps>(Box)
