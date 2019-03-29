import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import { ComponentEventHandler, ShorthandValue, ReactProps } from '../../types'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import { createShorthandFactory, UIComponent, RenderResultConfig, commonPropTypes } from '../../lib'
import Icon, { IconProps } from '../Icon/Icon'
import Image from '../Image/Image'
import Label from '../Label/Label'
import Ref from '../Ref/Ref'
import Box from '../Box/Box'

export interface DropdownSelectedItemSlotClassNames {
  header: string
  icon: string
  image: string
}

export interface DropdownSelectedItemProps extends UIComponentProps<DropdownSelectedItemProps> {
  /** A selected item can be active. */
  active?: boolean

  /** Header of the selected item. */
  header?: ShorthandValue

  /** Icon of the selected item. */
  icon?: ShorthandValue

  /** Image of the selected item. */
  image?: ShorthandValue

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
  onKeyDown?: ComponentEventHandler<DropdownSelectedItemProps>

  /**
   * Called when item is removed from the selection list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownSelectedItemProps>
}

/**
 * A DropdownSelectedItem is a sub-component of a multiple selection Dropdown.
 * It is used to display selected item.
 */
class DropdownSelectedItem extends UIComponent<ReactProps<DropdownSelectedItemProps>, any> {
  private itemRef = React.createRef<HTMLElement>()

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
    icon: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
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

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyDown', e, this.props)
  }

  private handleIconOverrides = (predefinedProps: IconProps) => ({
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

  public renderComponent({
    unhandledProps,
    styles,
  }: RenderResultConfig<DropdownSelectedItemProps>) {
    const { active, header, icon, image } = this.props

    const iconElement = Icon.create(icon, {
      defaultProps: {
        'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
        className: DropdownSelectedItem.slotClassNames.icon,
        styles: styles.icon,
      },
      overrideProps: this.handleIconOverrides,
    })
    const imageElement = Image.create(image, {
      defaultProps: {
        avatar: true,
        className: DropdownSelectedItem.slotClassNames.image,
        styles: styles.image,
      },
    })
    const contentElement = Box.create(header, {
      defaultProps: {
        as: 'span',
        className: DropdownSelectedItem.slotClassNames.header,
        styles: styles.header,
      },
    })

    return (
      <Ref innerRef={this.itemRef}>
        <Label
          tabIndex={active ? 0 : -1}
          styles={styles.root}
          circular
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          content={contentElement}
          icon={iconElement}
          image={imageElement}
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

export default DropdownSelectedItem
