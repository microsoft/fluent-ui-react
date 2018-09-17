import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { IconBehavior } from '../../lib/accessibility/'
import { Accessibility } from '../../lib/accessibility/interfaces'

import {
  ComponentVariablesInput,
  IComponentPartStylesInput,
  ThemeIcons,
} from '../../../types/theme'
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
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

export interface IIconExtraProps {
  isFontBased: boolean
}

/**
 * @accessibility
 * Default behavior: IconBehavior
 *  - attribute "aria-hidden='true'" is applied on icon
 */
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

    /** Additional classes. */
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

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
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

  renderFontIcon(ElementType, classes, rest, accessibility): React.ReactNode {
    return <ElementType className={classes.root} {...accessibility.attributes.root} {...rest} />
  }

  renderSvgIcon(ElementType, icons: ThemeIcons, classes, rest, accessibility): React.ReactNode {
    const { name } = this.props
    const renderIcon = icons[name]

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {renderIcon && renderIcon(classes)}
      </ElementType>
    )
  }

  isFontBased(themeIcons: ThemeIcons): boolean {
    const { name } = this.props
    const themeIcon = themeIcons[name]

    return !themeIcon || typeof themeIcon !== 'function'
  }

  getExtraProps({ icons }): IIconExtraProps {
    return {
      isFontBased: this.isFontBased(icons),
    }
  }

  renderComponent({ ElementType, classes, rest, accessibility, icons }) {
    return this.isFontBased(icons)
      ? this.renderFontIcon(ElementType, classes, rest, accessibility)
      : this.renderSvgIcon(ElementType, icons, classes, rest, accessibility)
  }
}

Icon.create = createShorthandFactory(Icon, name => ({ name }))

export default Icon
