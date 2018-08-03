import React, { CSSProperties } from 'react'
import PropTypes from 'prop-types'
import { customPropTypes, UIComponent, SUI } from '../../lib'

export type IconColor =
  | 'white'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'

export type IconSize = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'

export type IconXSpacing = 'none' | 'before' | 'after' | 'both'

export interface IconProps {
  as?: string
  bordered?: boolean
  circular?: boolean
  className?: string
  color?: IconColor
  disabled?: boolean
  kind?: string
  name?: string
  size?: IconSize
  xSpacing?: IconXSpacing
  style?: CSSProperties
  title?: string
}

class Icon extends UIComponent<IconProps, {}> {
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

    /** Color of the icon. */
    color: PropTypes.oneOf([
      'white',
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey',
      'black',
    ]),

    /** An icon can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** The type of font that needs to be used */
    kind: PropTypes.string,

    /** Name of the icon. */
    name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

    /** Size of the icon. */
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']),

    /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
    xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),
  }

  static handledProps = [
    'as',
    'bordered',
    'circular',
    'className',
    'color',
    'disabled',
    'kind',
    'name',
    'size',
    'xSpacing',
  ]

  static defaultProps = {
    as: 'i',
    kind: 'FontAwesome',
  }

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType className={classes.root} {...rest} />
  }
}

export default Icon
