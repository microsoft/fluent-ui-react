import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
import _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Icon } from '../..'
import labelRules from './labelRules'
import labelVariables from './labelVariables'

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
    icon: customPropTypes.some([PropTypes.bool, PropTypes.string, PropTypes.object]),

    /** An icon label can format an Icon to appear before or after the text in the label */
    iconPosition: PropTypes.oneOf(['before', 'after']),

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

  handleIconOverrides = predefinedProps => ({
    onClick: e => {
      _.invoke(predefinedProps, 'onClick', e)
      _.invoke(this.props, 'onIconClick', e, this.props)
    },
  })

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, icon, iconPosition, onIconClick } = this.props
    const getContent = (): ReactNode => {
      if (childrenExist(children)) {
        return children
      }

      const iconIsAfterContent = iconPosition === 'after'

      const iconProps = {
        className: classes.icon,
        ...(icon &&
          typeof icon === 'string' && {
            name: icon,
            ...(onIconClick && { tabIndex: '0' }),
            variables: { color: classes.root.color },
            xSpacing: !content ? 'none' : iconIsAfterContent ? 'before' : 'after',
          }),
        ...(icon &&
          typeof icon === 'object' && {
            ...icon,
            ...(icon.onClick && { tabIndex: '0' }),
          }),
      }

      const renderedContent = [
        content,
        icon &&
          Icon.create(
            {
              ...iconProps,
            },
            {
              generateKey: false,
              overrideProps: this.handleIconOverrides,
            },
          ),
      ].filter(Boolean)
      return iconIsAfterContent ? renderedContent : renderedContent.reverse()
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {getContent()}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
