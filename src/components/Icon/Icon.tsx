import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, SUI, createShorthandFactory } from '../../lib'

import iconRules from './iconRules'
import iconVariables from './iconVariables'

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

  static rules = iconRules

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType className={classes.root} {...rest} />
  }
}

Icon.create = createShorthandFactory(Icon, name => ({ name }))

export default Icon
