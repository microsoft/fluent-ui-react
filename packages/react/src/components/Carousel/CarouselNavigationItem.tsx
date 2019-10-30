import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import cx from 'classnames'

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
  UIComponent,
} from '../../lib'
import { withSafeTypeForAs, WithAsProp, ShorthandValue, ComponentEventHandler } from '../../types'
import Icon, { IconProps } from '../Icon/Icon'
import Box, { BoxProps } from '../Box/Box'

export interface CarouselNavigationItemSlotClassNames {
  wrapper: string
}

export interface CarouselNavigationItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
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

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>
}

export interface CarouselNavigationItemState {
  activeIndex?: number | string
}

class CarouselNavigationItem extends UIComponent<
  WithAsProp<CarouselNavigationItemProps>,
  CarouselNavigationItemState
> {
  static displayName = 'CarouselNavigationItem'

  static className = 'ui-carouselnavigation__item'

  static slotClassNames: CarouselNavigationItemSlotClassNames = {
    wrapper: `${CarouselNavigationItem.className}__wrapper`,
  }

  static create: ShorthandFactory<CarouselNavigationItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    icon: customPropTypes.itemShorthandWithoutJSX,
    iconOnly: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  }

  static defaultProps = {
    as: 'a',
    icon: { name: 'stardust-circle', size: 'smallest' as SizeValue },
    wrapper: { as: 'li' },
  }

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children, content, icon, wrapper } = this.props
    const elementInner = (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...(!wrapper && { onClick: this.handleClick })}
        {...unhandledProps}
        className={classes.root}
      >
        {icon &&
          Icon.create(icon, {
            defaultProps: {
              xSpacing: !!content ? 'after' : 'none',
              styles: styles.icon,
            },
          })}
        {Box.create(content, {
          defaultProps: { as: 'span', styles: styles.content },
        })}
      </ElementType>
    )
    const element = wrapper
      ? Box.create(wrapper, {
          defaultProps: {
            className: cx(CarouselNavigationItem.slotClassNames.wrapper, classes.wrapper),
            ...accessibility.attributes.wrapper,
            ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
          },
          overrideProps: () => ({
            children: <>{elementInner}</>,
            onClick: this.handleClick,
            onBlur: this.handleWrapperBlur,
          }),
        })
      : elementInner

    return childrenExist(children) ? children : element
  }

  handleClick = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleWrapperBlur = e => {}
}

CarouselNavigationItem.create = createShorthandFactory({
  Component: CarouselNavigationItem,
  mappedArrayProp: 'content',
})

export default withSafeTypeForAs<typeof CarouselNavigationItem, CarouselNavigationItemProps, 'ul'>(
  CarouselNavigationItem,
)
