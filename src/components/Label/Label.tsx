import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Icon, Image, ItemLayout } from '../..'
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

    startMedia: PropTypes.any,

    endMedia: PropTypes.any,
  }

  static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'endMedia',
    'startMedia',
  ]

  static defaultProps = {
    as: 'label',
  }

  static rules = labelRules

  static variables = labelVariables

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, startMedia, endMedia } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? (
          children
        ) : (
          <ItemLayout
            media={startMedia}
            header={content}
            headerMedia={endMedia}
            variables={{
              itemHeight: '20px',
              itemPaddingLeft: startMedia ? '0px' : '8px',
              itemPaddingRight: endMedia ? '0px' : '8px',
            }}
          />
        )}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
