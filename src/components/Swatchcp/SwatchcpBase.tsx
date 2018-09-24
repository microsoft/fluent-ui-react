import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'
import * as _ from 'lodash'
import * as cx from 'classnames'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { ComponentEventHandler, Extendable, ItemShorthand } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import { MenuItemBehavior } from '../../lib/accessibility'

export interface ISwatchcpBaseProps {
  as?: any
  active?: boolean
  className?: string
  color?: string
  index?: number
  icon?: ItemShorthand
  onClick?: ComponentEventHandler<ISwatchcpBaseProps>
  name?: string
  accessibility?: Accessibility
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A SwatchcpBase graphically represents someone's or something's state.
 */
class SwatchcpBase extends UIComponent<Extendable<ISwatchcpBaseProps>, any> {
  static create: Function

  static className = 'ui-swatchcpbase'

  static displayName = 'SwatchcpBase'

  static handledProps = [
    'accessibility',
    'icon',
    'active',
    'Index',
    'as',
    'className',
    'color',
    ' onClick',
    'name',
    'styles',
    'variables',
  ]

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A menu item can be active. */
    active: PropTypes.bool,

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /** Shorthand for the icon, to provide customizing status */
    icon: customPropTypes.itemShorthand,

    /** Additional classes. */
    className: PropTypes.string,

    /** A custom color. */
    color: PropTypes.string,

    /**
     * Called after radio is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A custom color. */
    name: PropTypes.string,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    active: 'false',
    accessibility: MenuItemBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, rest, styles, accessibility }) {
    const { color, name, icon } = this.props
    return (
      <ElementType
        {...rest}
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
      >
        <span {...accessibility.attributes.anchor} {...accessibility.keyHandlers.anchor}>
          <Icon name={name} variables={{ color }} size="large" xSpacing="none" />
        </span>
      </ElementType>
    )
  }

  actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }
  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }
}

SwatchcpBase.create = createShorthandFactory(SwatchcpBase, color => ({ color }))

export default SwatchcpBase
