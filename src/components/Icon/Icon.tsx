import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  callable,
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { iconBehavior } from '../../lib/accessibility/'
import { Accessibility } from '../../lib/accessibility/types'

import { SvgIconSpec } from '../../themes/types'
import { ReactProps } from '../../../types/utils'

export type IconXSpacing = 'none' | 'before' | 'after' | 'both'

export type IconSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'

export interface IconProps extends UIComponentProps, ColorComponentProps {
  /**
   * Accessibility behavior if overriden by the user.
   * @default iconBehavior
   * */
  accessibility?: Accessibility

  /** Icon can appear with rectangular border. */
  bordered?: boolean

  /** Icon can appear as circular. */
  circular?: boolean

  /** An icon can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name of the icon. */
  name?: string

  /** Size of the icon. */
  size?: IconSize

  /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
  xSpacing?: IconXSpacing
}

/**
 * An icon is a glyph used to represent something else.
 */
class Icon extends UIComponent<ReactProps<IconProps>, any> {
  static create: Function

  static className = 'ui-icon'

  static displayName = 'Icon'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
      color: true,
    }),
    accessibility: PropTypes.func,
    bordered: PropTypes.bool,
    circular: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    size: PropTypes.oneOf(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
    xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),
  }

  static defaultProps = {
    as: 'span',
    size: 'medium',
    accessibility: iconBehavior,
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

Icon.create = createShorthandFactory(Icon, 'name')

export default Icon
