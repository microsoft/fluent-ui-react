import { Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  ComponentKeyboardEventHandler,
  withSafeTypeForAs,
} from '../../types'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import { createShorthandFactory, UIComponent, RenderResultConfig, commonPropTypes } from '../../lib'
import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Label from '../Label/Label'
import Box from '../Box/Box'
import { HeaderProps } from '../Header/Header'

export interface DropdownSelectedItemSlotClassNames {
  header: string
  icon: string
  image: string
}

export interface DropdownSelectedItemProps extends UIComponentProps<DropdownSelectedItemProps> {
  /** A selected item can be active. */
  active?: boolean

  /** Header of the selected item. */
  header?: ShorthandValue<HeaderProps>

  /** Icon of the selected item. */
  icon?: ShorthandValue<IconProps>

  /** Image of the selected item. */
  image?: ShorthandValue<ImageProps>

  /**
   * Called on selected item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownSelectedItemProps>

  /**
   * Called on selected item key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<DropdownSelectedItemProps>

  /**
   * Called when item is removed from the selection list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownSelectedItemProps>
}

class DropdownSelectedItem extends UIComponent<WithAsProp<DropdownSelectedItemProps>, any> {
  itemRef = React.createRef<HTMLElement>()

  static displayName = 'DropdownSelectedItem'
  static create: Function
  static slotClassNames: DropdownSelectedItemSlotClassNames
  static className = 'ui-dropdown__selecteditem'

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
    }),
    active: PropTypes.bool,
    header: customPropTypes.itemShorthand,
    icon: customPropTypes.itemShorthandWithoutJSX,
    image: customPropTypes.itemShorthandWithoutJSX,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onRemove: PropTypes.func,
  }

  static defaultProps = {
    icon: 'close',
  }

  componentDidUpdate(prevProps: DropdownSelectedItemProps) {
    if (!prevProps.active && this.props.active) {
      this.itemRef.current.focus()
    }
  }

  handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyDown', e, this.props)
  }

  handleIconOverrides = props => (predefinedProps: IconProps) => ({
    ...props,
    onClick: (e: React.SyntheticEvent, iconProps: IconProps) => {
      e.stopPropagation()
      _.invoke(this.props, 'onRemove', e, this.props)
      _.invoke(predefinedProps, 'onClick', e, iconProps)
    },
    onKeyDown: (e: React.SyntheticEvent, iconProps: IconProps) => {
      e.stopPropagation()
      if (keyboardKey.getCode(e) === keyboardKey.Enter) {
        _.invoke(this.props, 'onRemove', e, this.props)
      }
      _.invoke(predefinedProps, 'onKeyDown', e, iconProps)
    },
  })

  renderComponent({
    unhandledProps,
    classes,
    styles,
  }: RenderResultConfig<DropdownSelectedItemProps>) {
    const { active, header, icon, image } = this.props

    const contentElement = Box.create(header, {
      defaultProps: {
        as: 'span',
        className: DropdownSelectedItem.slotClassNames.header,
        styles: styles.header,
      },
    })
    const renderIcon = _.isNil(icon)
      ? icon
      : render =>
          render(icon, (ComponentType, props) =>
            Icon.create(icon, {
              defaultProps: {
                'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
                className: DropdownSelectedItem.slotClassNames.icon,
                styles: styles.icon,
              },
              overrideProps: this.handleIconOverrides(props),
            }),
          )
    const renderImage = _.isNil(image)
      ? image
      : render =>
          render(image, (ComponentType, props) =>
            Image.create(image, {
              defaultProps: {
                avatar: true,
                className: DropdownSelectedItem.slotClassNames.image,
                styles: styles.image,
              },
              overrideProps: props,
            }),
          )

    return (
      <Ref innerRef={this.itemRef}>
        <Label
          className={classes.root}
          tabIndex={active ? 0 : -1}
          styles={styles.root}
          circular
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          content={contentElement}
          icon={renderIcon}
          image={renderImage}
          {...unhandledProps}
        />
      </Ref>
    )
  }
}

DropdownSelectedItem.slotClassNames = {
  header: `${DropdownSelectedItem.className}__header`,
  icon: `${DropdownSelectedItem.className}__icon`,
  image: `${DropdownSelectedItem.className}__image`,
}

DropdownSelectedItem.create = createShorthandFactory({
  Component: DropdownSelectedItem,
  mappedProp: 'header',
})

/**
 * A a sub-component of multiple-selection Dropdown.
 * Used to display selected item.
 */
export default withSafeTypeForAs<typeof DropdownSelectedItem, DropdownSelectedItemProps>(
  DropdownSelectedItem,
)
