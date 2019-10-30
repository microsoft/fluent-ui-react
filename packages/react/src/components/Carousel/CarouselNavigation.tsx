import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
  UIComponent,
} from '../../lib'
import { tabListBehavior } from '@stardust-ui/accessibility'
import {
  withSafeTypeForAs,
  WithAsProp,
  ShorthandCollection,
  ComponentEventHandler,
} from '../../types'
import CarouselNavigationItem, { CarouselNavigationItemProps } from './CarouselNavigationItem'
import { ComponentSlotStylesPrepared, ComponentVariablesObject } from '../../themes/types'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'

export interface CarouselNavigationProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active item. */
  activeIndex?: number | string

  /** A navigation may have just icons. */
  iconOnly?: boolean

  /** Shorthand array of props for Navigation. */
  items?: ShorthandCollection<CarouselNavigationItemProps>

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<CarouselNavigationItemProps>
}

class CarouselNavigation extends UIComponent<WithAsProp<CarouselNavigationProps>> {
  static displayName = 'CarouselNavigation'

  static className = 'ui-carouselnavigation'

  static create: ShorthandFactory<CarouselNavigationProps>

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconOnly: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    onItemClick: PropTypes.func,
  }

  static defaultProps = {
    accessibility: tabListBehavior,
    as: 'ul',
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(this.props, 'onItemClick', e, itemProps)
      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = (
    styles: ComponentSlotStylesPrepared,
    variables: ComponentVariablesObject,
    accessibility: ReactAccessibilityBehavior,
  ) => {
    const { iconOnly, items } = this.props

    return _.map(items, (item, index) =>
      CarouselNavigationItem.create(item, {
        defaultProps: {
          iconOnly,
          index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(styles, variables, accessibility)}
      </ElementType>
    )
  }
}

CarouselNavigation.create = createShorthandFactory({
  Component: CarouselNavigation,
  mappedArrayProp: 'items',
})

export default withSafeTypeForAs<typeof CarouselNavigation, CarouselNavigationProps, 'ul'>(
  CarouselNavigation,
)
