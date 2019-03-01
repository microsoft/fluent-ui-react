import * as React from 'react'
import { createShorthandFactory, callable, getUnhandledProps } from '../../lib'

import { BoxClassName, BoxProps, boxPropTypes, renderBox } from './common'
import { FelaTheme } from 'react-fela'
import { IRenderer as FelaRenderer } from 'fela'
import cx from 'classnames'

const withThemeContext = render => <FelaTheme>{(theme: any) => render(theme)}</FelaTheme>

type BoxRenderConfig = {
  ElementType: React.ReactType
  props: BoxProps
  renderer: FelaRenderer
}

const render = ({ ElementType, props, renderer }: BoxRenderConfig): React.ReactNode => {
  const { styles, className: predefinedClasses, content, children } = props

  const unhandledProps = getUnhandledProps(BoxLight, props)
  const classes = {
    root: renderer.renderRule(callable(styles), props),
  }
  classes.root = cx(predefinedClasses, classes.root)

  return renderBox({
    ElementType,
    classes,
    children,
    content,
    unhandledProps,
  })
}

/**
 * A Box is a basic component (ndo default styles)
 */
const BoxLight = (props: BoxProps) => {
  const { as: ElementType, theme } = props

  if (!theme) {
    return withThemeContext(theme =>
      render({
        ElementType,
        props,
        renderer: theme.renderer,
      }),
    )
  }

  return render({
    ElementType,
    props,
    renderer: theme.renderer,
  })
}

BoxLight.propTypes = boxPropTypes
BoxLight.handledProps = Object.keys(BoxLight.propTypes)

BoxLight.defaultProps = {
  as: 'div',
}

BoxLight.displayName = 'Box'
BoxLight.className = BoxClassName

BoxLight.create = createShorthandFactory(BoxLight as any)

export default BoxLight
export { BoxProps } from './common'
