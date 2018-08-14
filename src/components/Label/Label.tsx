import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  callable,
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
} from '../../lib'

import { Icon } from '../..'

/**
 * A label displays content classification
 */
class Label extends UIComponent<any, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A label can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Label can have an icon. */
    icon: customPropTypes.some([PropTypes.string, PropTypes.object]),

    /** An icon label can format an Icon to appear before or after the text in the label */
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /**
     * Function called when the icon is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onIconClick: PropTypes.func,
  }

  static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'icon',
    'iconPosition',
    'onIconClick',
  ]

  static defaultProps = {
    as: 'label',
  }

  handleIconOverrides = iconProps => {
    const { onIconClick, iconPosition, content, variables } = this.props
    const iconVariables = callable(iconProps.variables)() || {}
    const labelVariables = callable(variables)() || {}

    return {
      onClick: e => {
        _.invoke(iconProps, 'onClick', e)
        _.invoke(this.props, 'onIconClick', e, this.props)
      },
      ...((iconProps.onClick || onIconClick) && { tabIndex: '0' }),
      ...((!iconVariables || !iconVariables.color) && {
        variables: { color: labelVariables.color },
      }),
      ...(!iconProps.xSpacing && {
        xSpacing: !content ? 'none' : iconPosition === 'end' ? 'before' : 'after',
      }),
    }
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, icon, iconPosition } = this.props
    const getContent = (): React.ReactNode => {
      const iconAtEnd = iconPosition === 'end'
      const iconAtStart = !iconAtEnd

      const iconElement = Icon.create(
        {
          className: classes.icon,
          ...(typeof icon === 'string' ? { name: icon } : { ...icon }),
        },
        {
          generateKey: false,
          overrideProps: this.handleIconOverrides,
        },
      )

      return (
        <React.Fragment>
          {iconAtStart && icon && iconElement}
          {content}
          {iconAtEnd && icon && iconElement}
        </React.Fragment>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : getContent()}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
