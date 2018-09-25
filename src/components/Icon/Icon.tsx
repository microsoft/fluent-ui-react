import * as React from 'react'
import * as PropTypes from 'prop-types'
import { callable, customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { IconBehavior } from '../../lib/accessibility/'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentPartStyle, ComponentVariablesInput, SvgIconSpec } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export type IconXSpacing = 'none' | 'before' | 'after' | 'both'
export type IconSize =
  | 'micro'
  | 'mini'
  | 'tiny'
  | 'small'
  | 'normal'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive'

export interface IIconProps {
  as?: any
  bordered?: boolean
  circular?: boolean
  className?: string
  disabled?: boolean
  name?: string
  size?: IconSize
  xSpacing?: IconXSpacing
  accessibility?: Accessibility
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class Icon extends UIComponent<Extendable<IIconProps>, any> {
  static create: Function

  static className = 'ui-icon'

  static displayName = 'Icon'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Icon can appear with rectangular border. */
    bordered: PropTypes.bool,

    /** Icon can appear as circular. */
    circular: PropTypes.bool,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** An icon can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

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

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
    xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'bordered',
    'circular',
    'className',
    'disabled',
    'name',
    'size',
    'styles',
    'variables',
    'xSpacing',
  ]

  static defaultProps = {
    as: 'span',
    size: 'normal',
    accessibility: IconBehavior,
  }

  private renderFontIcon(ElementType, classes, rest, accessibility): React.ReactNode {
    return <ElementType className={classes.root} {...accessibility.attributes.root} {...rest} />
  }

  private renderSvgIcon(
    ElementType,
    svgIconDescriptor: SvgIconSpec,
    classes,
    rest,
    accessibility,
  ): React.ReactNode {
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {svgIconDescriptor && callable(svgIconDescriptor)({ classes })}
      </ElementType>
    )
  }

  public renderComponent({ ElementType, classes, rest, accessibility, theme }) {
    const { icons = {} } = theme

    const maybeIcon = icons[this.props.name]

    return maybeIcon && maybeIcon.isSvg
      ? this.renderSvgIcon(ElementType, maybeIcon.icon as SvgIconSpec, classes, rest, accessibility)
      : this.renderFontIcon(ElementType, classes, rest, accessibility)
  }
}

Icon.create = createShorthandFactory(Icon, name => ({ name }))

export default Icon
