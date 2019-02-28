import { createShorthandFactory, getClasses, felaRenderer } from '../../lib'

import { BoxClassName, BoxProps, renderBox } from './common'
import cx from 'classnames'

/**
 * A Box is a basic component (no default styles)
 */
const BoxLight = (props: BoxProps) => {
  const {
    as: ElementType = 'div',
    children,
    className: predefinedClasses,
    content,
    styles,
    ...unhandledProps
  } = props

  const classes = getClasses(felaRenderer, { root: styles }, {} as any)
  classes.root = cx(predefinedClasses, classes.root)

  return renderBox({
    ElementType,
    classes,
    children,
    content,
    unhandledProps,
  })
}

BoxLight.displayName = 'Box'
BoxLight.className = BoxClassName

BoxLight.create = createShorthandFactory(BoxLight)

export default BoxLight
export { BoxProps } from './common'
