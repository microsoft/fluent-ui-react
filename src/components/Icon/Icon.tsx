import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'

import iconRules from '../../themes/teams/components/Icon/iconRules'
import iconVariables from '../../themes/teams/components/Icon/iconVariables'
import svgIcons from './svgIcons'

export type IconXSpacing = 'none' | 'before' | 'after' | 'both'

class Icon extends UIComponent<any, any> {
  static create: Function

  static className = 'ui-icon'

  static displayName = 'Icon'

  static variables = iconVariables

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Icon can appear with rectangular border. */
    bordered: PropTypes.bool,

    /** Icon can appear as circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** An icon can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Sets font for a font-based icon.  */
    font: customPropTypes.some([PropTypes.bool, PropTypes.string]),

    /** Name of the icon. */
    name: PropTypes.string,

    /** Size of the icon. */
    size: PropTypes.oneOf([
      'micro',
      'mini',
      'tiny',
      'small',
      'normal',
      'large',
      'big',
      'huge',
      'massive',
    ]),

    /** Render icon from SVGs collection.  */
    svg: PropTypes.bool,

    /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
    xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),
  }

  static handledProps = [
    'as',
    'bordered',
    'circular',
    'className',
    'disabled',
    'font',
    'name',
    'size',
    'svg',
    'xSpacing',
  ]

  static defaultProps = {
    as: 'span',
    size: 'normal',
  }

  static rules = iconRules

  renderFontIcon(ElementType, classes, rest): React.ReactNode {
    return <ElementType className={classes.root} {...rest} />
  }

  renderSvgIcon(ElementType, classes, rest): React.ReactNode {
    const icon = svgIcons[this.props.name]

    return (
      <ElementType className={classes.root} {...rest}>
        <svg className={classes.svg} viewBox={icon && icon.viewBox}>
          {icon && icon.element}
        </svg>
      </ElementType>
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    return this.props.svg
      ? this.renderSvgIcon(ElementType, classes, rest)
      : this.renderFontIcon(ElementType, classes, rest)
  }
}

Icon.create = createShorthandFactory(Icon, name => ({ name }))

export default Icon
