import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import { ComponentEventHandler, ShorthandValue, ReactProps } from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import {
  customPropTypes,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  commonPropTypes,
} from '../../lib'
import { Image, Icon, Label } from '../..'
import { IconProps } from '../Icon/Icon'

export interface DropdownLabelProps extends UIComponentProps<DropdownLabelProps> {
  /** Header of the selected item. */
  header?: string

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
  onClick?: ComponentEventHandler<DropdownLabelProps>

  /**
   * Called when item is removed from the selection list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownLabelProps>
}

/**
 * A DropdownLabel is a sub-component of a multiple selection Dropdown.
 * It is used to display selected item.
 */
class DropdownLabel extends UIComponent<ReactProps<DropdownLabelProps>, any> {
  displayName = 'DropdownLabel'

  static create: Function

  className = 'ui-dropdown__label'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
    }),
    header: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
  }

  static defaultProps = {
    icon: 'close',
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({ rest, styles }: RenderResultConfig<DropdownLabelProps>) {
    const { header, icon, image } = this.props

    return (
      <Label
        styles={styles.root}
        role="presentation"
        circular
        onClick={this.handleClick}
        content={header}
        icon={Icon.create(icon, {
          defaultProps: {
            'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
            'aria-hidden': false,
            role: 'button',
          },
          overrideProps: this.handleIconOverrides,
        })}
        image={Image.create(image, {
          defaultProps: {
            avatar: true,
          },
        })}
        {...rest}
      />
    )
  }

  private handleIconOverrides = (predefinedProps: DropdownLabelProps) => ({
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
}

DropdownLabel.create = createShorthandFactory(DropdownLabel, 'header')

export default DropdownLabel
