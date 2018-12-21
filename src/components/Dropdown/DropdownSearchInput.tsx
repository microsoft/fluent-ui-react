import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { UIComponent, RenderResultConfig, createShorthandFactory, commonPropTypes } from '../../lib'
import { ComponentEventHandler, ReactProps } from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import Input from '../Input/Input'
import Ref from '../Ref/Ref'

export interface DropdownSearchInputProps extends UIComponentProps<DropdownSearchInputProps> {
  /**
   * Ref callback with an input DOM node.
   *
   * @param {JSX.Element} node - input DOM node.
   */
  inputRef?: (inputNode: HTMLElement) => void

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

  static className = 'ui-dropdown__searchinput'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    accessibilityInputProps: PropTypes.object,
    accessibilityWrapperProps: PropTypes.object,
    inputRef: PropTypes.func,
    onFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
  }

  private handleInputRef = (inputNode: HTMLElement) => {
    _.invoke(this.props, 'inputRef', inputNode)
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

  public renderComponent({ rest, styles }: RenderResultConfig<DropdownSearchInputProps>) {
    const { accessibilityWrapperProps, accessibilityInputProps, placeholder } = this.props
    const { innerRef, ...accessibilityWrapperPropsRest } = accessibilityWrapperProps
    return (
      <Ref innerRef={innerRef}>
        <Input
          inputRef={this.handleInputRef}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyUp}
          wrapper={{
            styles: styles.wrapper,
            ...accessibilityWrapperPropsRest,
          }}
          input={{
            type: 'text',
            styles: styles.input,
            placeholder,
            onBlur: this.handleInputBlur,
            onKeyDown: this.handleInputKeyDown,
            ...accessibilityInputProps,
          }}
          {...rest}
        />
      </Ref>
    )
  }
}

DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput)

export default DropdownSearchInput
