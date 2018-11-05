import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import { menuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import {
  ComponentVariablesInput,
  ComponentVariablesObject,
  ComponentSlotStyle,
} from '../../themes/types'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface MenuProps {
  accessibility?: Accessibility
  as?: any
  activeIndex?: number | string
  children?: ReactChildren
  className?: string
  defaultActiveIndex?: number | string
  fluid?: boolean
  iconOnly?: boolean
  items?: ShorthandValue[]
  pills?: boolean
  pointing?: boolean | 'start' | 'end'
  primary?: boolean
  renderItem?: ShorthandRenderFunction
  secondary?: boolean
  underlined?: boolean
  vertical?: boolean
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A menu displays grouped navigation actions.
 */
class Menu extends AutoControlledComponent<Extendable<MenuProps>, any> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static create: Function

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A vertical menu may take the size of its container. */
    fluid: PropTypes.bool,

    /** A menu may have just icons. */
    iconOnly: PropTypes.bool,

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    /** A menu can adjust its appearance to de-emphasize its contents. */
    pills: PropTypes.bool,

    /**
     * A menu can point to show its relationship to nearby content.
     * For vertical menu, it can point to the start of the item or to the end.
     */
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),

    /** The menu can have primary type. */
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),

    /**
     * A custom render iterator for rendering each of the Menu items.
     * The default component, props, and children are available for each item.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderItem: PropTypes.func,

    /** The menu can have secondary type. */
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),

    /** Menu items can by highlighted using underline. */
    underlined: PropTypes.bool,

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'ul',
    accessibility: menuBehavior as Accessibility,
  }

  static autoControlledProps = ['activeIndex']

  static Item = MenuItem

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = (variables: ComponentVariablesObject) => {
    const {
      iconOnly,
      items,
      pills,
      pointing,
      primary,
      renderItem,
      secondary,
      underlined,
      vertical,
    } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          iconOnly,
          pills,
          pointing,
          primary,
          secondary,
          underlined,
          variables,
          vertical,
          index,
          active: parseInt(activeIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
        render: renderItem,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, variables, rest }) {
    const { children } = this.props
    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

export default Menu
