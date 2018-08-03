import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import ListItem from './ListItem'
import listRules from './listRules'
import listVariables from './listVariables'
import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'

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

    /** Accessibility behavior name */
    accBehavior: PropTypes.string,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'accBehavior',
    'as',
    'children',
    'className',
    'debug',
    'items',
    'selection',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static Item = ListItem

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.list,
    )
  }

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props

    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items } = this.props
    const itemProps = _.pick(this.props, List.itemProps)

    return _.map(items, item => ListItem.create(item, { defaultProps: itemProps }))
  }
}

export default List
