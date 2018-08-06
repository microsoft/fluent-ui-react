import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { ReactNode, SyntheticEvent } from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'
import menuVariables from './menuVariables'
import { OffsetBlockEndProperty } from 'csstype'
import { FocusZone, FocusZoneDirection } from '../FocusZone'

interface MenuState {
  activeIndex: number
}

export type MenuType = 'primary' | 'secondary'
export type MenuShape = 'pills' | 'pointing' | 'underlined'

export interface IMenuProps {
  as?: string
  activeIndex?: number | string
  children?: ReactNode
  className?: string
  defaultActiveIndex?: number | string
  items?: any
  shape?: MenuShape
  type?: MenuType
  vertical?: boolean
  grabFocus?: boolean
  componentRef?: object
  accBehavior?: string
  onKeyDown?: (e: SyntheticEvent, props: IMenuProps) => void
}

class Menu extends AutoControlledComponent<IMenuProps, MenuState> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static variables = menuVariables

  static create: Function

  private navDirection: FocusZoneDirection

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    grabFocus: PropTypes.bool,

    componentRef: PropTypes.object,

    accBehavior: PropTypes.string,

    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'items',
    'shape',
    'type',
    'vertical',
    'grabFocus',
    'accBehavior',
    'onKeyDown',
  ]

  static autoControlledProps = ['activeIndex']

  static rules = menuRules

  static Item = MenuItem

  focusGrabbed = false

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.menu,
    )

    this.navDirection = this.props.vertical
      ? FocusZoneDirection.vertical
      : FocusZoneDirection.horizontal
  }

  componentDidMount() {
    this.grabFocusIfNeeded()
  }

  componentDidUpdate() {
    this.grabFocusIfNeeded()
  }

  grabFocusIfNeeded() {
    if (this.props.grabFocus && !this.focusGrabbed && this.focusZone) {
      this.focusGrabbed = true
      this.focusZone.focus()
    }
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
    accBehavior: this.props.vertical
      ? AccBehaviorType[AccBehaviorType.verticalMenuItem]
      : AccBehaviorType[AccBehaviorType.menuItem],
  })

  renderItems = () => {
    const { items, type, shape, vertical } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          vertical,
          index,
          active: activeIndex === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props

    return (
      <FocusZone
        direction={this.navDirection}
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        isCircularNavigation={true}
        ref={this.setFocusZone}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
        onKeyDown={this.props.onKeyDown}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </FocusZone>
    )
  }
}

export default Menu
