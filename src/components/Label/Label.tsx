import PropTypes from 'prop-types'
import React from 'react'
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

    /**
     * Adds an "x" icon, called when "x" is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onRemove: PropTypes.func,

    /** Shorthand for Icon to appear as the last child and trigger onRemove. */
    removeIcon: customPropTypes.itemShorthand,
  }

  static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'onRemove',
    'removeIcon',
  ]

  static defaultProps = {
    as: 'label',
  }

  static rules = labelRules

  static variables = labelVariables

  handleIconOverrides = predefinedProps => ({
    onClick: e => {
      _.invoke(predefinedProps, 'onClick', e)
      _.invoke(this.props, 'onRemove', e, this.props)
    },
  })

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, onRemove, removeIcon } = this.props

    const removeIconShorthand = removeIcon || 'close'

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
        {onRemove &&
          Icon.create(
            {
              name: removeIconShorthand,
              className: classes.removeIcon,
              variables: { color: classes.root.color },
            },
            {
              generateKey: false,
              overrideProps: this.handleIconOverrides,
            },
          )}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
