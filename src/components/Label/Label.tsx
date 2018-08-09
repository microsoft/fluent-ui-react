import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  pxToRem,
  UIComponent,
} from '../../lib'

import { Layout } from '../..'
import labelStyles from '../../themes/teams/components/Label/labelStyles'
import labelVariables from '../../themes/teams/components/Label/labelVariables'

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

    start: PropTypes.any,

    end: PropTypes.any,
  }

  static handledProps = ['as', 'children', 'circular', 'className', 'content', 'end', 'start']

  static defaultProps = {
    as: 'span',
  }

  static styles = labelStyles

  static variables = labelVariables

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, start, end } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? (
          children
        ) : (
          <Layout main={content} start={start} end={end} gap={pxToRem(3)} />
        )}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
