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

const render = ({ ElementType, props, renderer }: BoxRenderConfig) => {
  const { styles, className: predefinedClasses, content, children } = props

  const unhandledProps = getUnhandledProps({ handledProps }, props)
  const classes = {
    root: renderer.renderRule(callable(styles), props),
  }
  classes.root = cx(BoxClassName, predefinedClasses, classes.root)

  return renderBox({
    ElementType,
    classes,
    children,
    content,
    unhandledProps,
  })
}

/**
 * A Box is a basic component (no default styles)
 */
const Box: React.FunctionComponent<BoxProps> & { create: Function } = props => {
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

const handledProps = Object.keys(boxPropTypes)

Box.propTypes = boxPropTypes
Box.defaultProps = {
  as: 'div',
}

Box.displayName = 'Box'

Box.create = createShorthandFactory(Box)

export default Box
export { BoxProps } from './common'
