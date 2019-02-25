import * as React from 'react'
import {
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'

type WithAsProps = { as?: any }

export interface BoxLightProps extends WithAsProps, ContentComponentProps, ChildrenComponentProps {}

/**
 * A Box is a basic component (no default styles)
 */
const BoxLight: React.FunctionComponent<BoxLightProps> & { create: Function } = (
  props: BoxLightProps,
) => {
  const { children, content } = props

  const ElementType = props.as
  const className = 'ui-box__light'

  return (
    <ElementType className={className}>{childrenExist(children) ? children : content}</ElementType>
  )
}

BoxLight.displayName = 'BoxLight'
BoxLight.defaultProps = {
  as: 'div',
}

BoxLight.propTypes = {
  ...commonPropTypes.createCommon(),
}

BoxLight.create = createShorthandFactory(BoxLight)

export default BoxLight
