import { createShorthandFactory } from '../../lib'
import createComponent, { CreateComponentReturnType } from '../../lib/createComponent'
import { ReactProps } from '../../types'

import { BoxClassName, BoxProps, boxPropTypes, renderBox } from './common'

/**
 * A Box is a basic component (no default styles)
 */
const Box: CreateComponentReturnType<ReactProps<BoxProps>> = createComponent<BoxProps>({
  displayName: 'BoxHeavy',

  className: BoxClassName,

  propTypes: boxPropTypes,

  render(config, props) {
    const { ElementType, classes, unhandledProps } = config
    const { children, content } = props

    return renderBox({
      ElementType,
      classes,
      content,
      children,
      unhandledProps,
    })
  },
})

Box.create = createShorthandFactory(Box)

export default Box
export { BoxProps } from './common'
