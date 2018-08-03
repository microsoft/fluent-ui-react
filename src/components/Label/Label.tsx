import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Icon } from '../..'
import labelRules from './labelRules'
import labelVariables from './labelVariables'
import callable from '../../lib/callable'

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

  static rules = labelRules

  static variables = labelVariables

  handleIconOverrides = predefinedProps => {
    const { onIconClick, iconPosition, content, variables: labelPropVariables } = this.props
    const { onClick, variables, xSpacing } = predefinedProps

    const iconVariables = callable(variables)()
    const labelVariables = labelPropVariables
      ? callable(labelPropVariables)()
      : callable(Label.variables)()

    return {
      onClick: e => {
        _.invoke(predefinedProps, 'onClick', e)
        _.invoke(this.props, 'onIconClick', e, this.props)
      },
      ...((onClick || onIconClick) && { tabIndex: '0' }),
      ...((!iconVariables || !iconVariables.color) && {
        variables: { color: labelVariables.color },
      }),
      ...(!xSpacing && {
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
