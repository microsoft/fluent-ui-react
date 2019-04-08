import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { UIComponent, RenderResultConfig, createShorthandFactory, commonPropTypes } from '../../lib'
import { ComponentEventHandler, ReactProps } from '../../types'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import Input from '../Input/Input'

export interface DropdownSearchInputSlotClassNames {
  input: string
  wrapper: string
}

export interface DropdownSearchInputProps extends UIComponentProps<DropdownSearchInputProps> {
  /** A dropdown search input can be formatted to appear inline in the context of a Dropdown. */
  inline?: boolean

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>

  /**
   * Called on input element focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onFocus?: ComponentEventHandler<DropdownSearchInputProps>

  /**
   * Called on input element blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onInputBlur?: ComponentEventHandler<DropdownSearchInputProps>

  /**
   * Called on input key down event.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onInputKeyDown?: ComponentEventHandler<DropdownSearchInputProps>

  /**
   * Called on input key up event.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onKeyUp?: ComponentEventHandler<DropdownSearchInputProps>

  /** A placeholder message. */
  placeholder?: string
}

/**
 * A DropdownSearchInput is a sub-component of a Dropdown that also has a search function, used to display the search input field.
 */
class DropdownSearchInput extends UIComponent<ReactProps<DropdownSearchInputProps>, any> {
  static displayName = 'DropdownSearchInput'
  static create: Function
  static slotClassNames: DropdownSearchInputSlotClassNames
  static className = 'ui-dropdown__searchinput'

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    accessibilityInputProps: PropTypes.object,
    accessibilityComboboxProps: PropTypes.object,
    inline: PropTypes.bool,
    inputRef: customPropTypes.ref,
    onFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private handleInputKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onInputKeyDown', e, this.props)
  }

  private handleInputBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onInputBlur', e, this.props)
  }

  private handleKeyUp = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyUp', e, this.props)
  }

  public renderComponent({ unhandledProps, styles }: RenderResultConfig<DropdownSearchInputProps>) {
    const {
      accessibilityComboboxProps,
      accessibilityInputProps,
      inputRef,
      placeholder,
    } = this.props
    return (
      <Input
        inputRef={inputRef}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyUp}
        {...unhandledProps}
        wrapper={{
          className: DropdownSearchInput.slotClassNames.wrapper,
          styles: styles.root,
          ...accessibilityComboboxProps,
          ...unhandledProps.wrapper,
        }}
        input={{
          type: 'text',
          className: DropdownSearchInput.slotClassNames.input,
          styles: styles.input,
          placeholder,
          onBlur: this.handleInputBlur,
          onKeyDown: this.handleInputKeyDown,
          ...accessibilityInputProps,
          ...unhandledProps.input,
        }}
      />
    )
  }
}

DropdownSearchInput.slotClassNames = {
  input: `${DropdownSearchInput.className}__input`,
  wrapper: `${DropdownSearchInput.className}__wrapper`,
}

DropdownSearchInput.create = createShorthandFactory({ Component: DropdownSearchInput })

export default DropdownSearchInput
