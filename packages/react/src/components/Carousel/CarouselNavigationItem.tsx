import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import { Accessibility, tabBehavior } from '@stardust-ui/accessibility'

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  SizeValue,
  isFromKeyboard,
  UIComponent,
} from '../../lib'
import { withSafeTypeForAs, WithAsProp, ShorthandValue, ComponentEventHandler } from '../../types'
import Icon, { IconProps } from '../Icon/Icon'
import Box from '../Box/Box'

export interface CarouselNavigationItemSlotClassNames {
  wrapper: string
}

export interface CarouselNavigationItemState {
  isFromKeyboard: boolean
}

export interface CarouselNavigationItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** A menu item can be active. */
  active?: boolean

  /** Name or shorthand for Carousel Navigation Item Icon */
  icon?: ShorthandValue<IconProps>

  /** A Carousel Navigation may have just icons. */
  iconOnly?: boolean

  /** CarouselNavigationIntem index inside CarouselNavigation. */
  index?: number

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<CarouselNavigationItemProps>

  /** The carousel navigation item can have primary type. */
  primary?: boolean

  /** The carousel navigation item can have secondary type. */
  secondary?: boolean

  /** Carousel navigation items can by highlighted using underline. */
  underlined?: boolean

  /** A vertical carousel navigation displays elements vertically. */
  vertical?: boolean
}

export interface CarouselNavigationItemState {
  activeIndex?: number | string
}

class CarouselNavigationItem extends UIComponent<
  WithAsProp<CarouselNavigationItemProps>,
  CarouselNavigationItemState
> {
  static displayName = 'CarouselNavigationItem'

  static className = 'ui-carousel__navigationitem'

  static create: ShorthandFactory<CarouselNavigationItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
    iconOnly: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: tabBehavior as Accessibility,
    as: 'li',
    icon: { name: 'stardust-circle', size: 'smallest' as SizeValue },
  }

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children, content, icon } = this.props

    return childrenExist(children) ? (
      children
    ) : (
      <ElementType
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...unhandledProps}
      >
        {Icon.create(icon, {
          defaultProps: () => ({
            xSpacing: !!content ? 'after' : 'none',
            styles: styles.icon,
          }),
        })}
        {Box.create(content, {
          defaultProps: () => ({ as: 'span', styles: styles.content }),
        })}
      </ElementType>
    )
  }

  handleClick = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  actionHandlers = {
    performClick: event => !event.defaultPrevented && this.handleClick(event),
  }
}

CarouselNavigationItem.create = createShorthandFactory({
  Component: CarouselNavigationItem,
  mappedArrayProp: 'content',
})

/**
 * A CarouselItem is an actionable item within a Carousel.
 */
export default withSafeTypeForAs<typeof CarouselNavigationItem, CarouselNavigationItemProps, 'li'>(
  CarouselNavigationItem,
)
