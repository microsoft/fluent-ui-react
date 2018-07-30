import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { customPropTypes, UIComponent } from '../../lib'
import ListItem from './ListItem'
import listRules from './listRules'
import listVariables from './listVariables'
import { A11yBehaviorType, A11yBehaviorFactory } from '../../lib/accessibility/A11yBehaviorFactory'

class List extends UIComponent<any, any> {
  static displayName = 'List'

  static className = 'ui-list'

  static rules = listRules

  static variables = listVariables

  static propTypes = {
    as: customPropTypes.as,

    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: PropTypes.arrayOf(PropTypes.any),

    /** A selection list formats list items as possible choices. */
    selection: PropTypes.bool,

    /** Truncates content */
    truncateContent: PropTypes.bool,

    /** Truncates header */
    truncateHeader: PropTypes.bool,

    /** Variables */
    variables: PropTypes.object,

    a11yType: PropTypes.string,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'debug',
    'items',
    'selection',
    'truncateContent',
    'truncateHeader',
    'variables',
    'a11yType',
  ]

  static Item = ListItem

  constructor(props, state) {
    super(props, state)
    const a11yType: string = props.a11yType
    this.accBehavior = A11yBehaviorFactory.createBehavior(
      A11yBehaviorType[a11yType] || A11yBehaviorType.list,
    )
  }

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  renderComponent({ ElementType, classes, rest }) {
    const { items } = this.props
    const itemProps = _.pick(this.props, List.itemProps)

    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
      >
        {_.map(items, item => ListItem.create(item, { defaultProps: itemProps }))}
      </ElementType>
    )
  }
}

export default List
