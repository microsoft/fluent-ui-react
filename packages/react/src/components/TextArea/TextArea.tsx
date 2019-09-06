import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'
import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  RenderResultConfig,
  AutoControlledComponent,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { textAreaBehavior } from '../../lib/accessibility'

export interface TextAreaSlotClassNames {
  textArea: string
}

export interface TextAreaProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** The default value of the text area. */
  defaultValue?: string

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onChange?: ComponentEventHandler<TextAreaProps>

  /** The value of the text area. */
  value?: string

  /** The maximum number of characters allowed in the text area. */
  maxLength?: number

  /**
   * Text describing the expected value of the text area.
   */
  placeholder?: string

  /**
   * The text area becomes read-only.
   */
  disabled?: boolean
}

export interface TextAreaState {
  value?: TextAreaProps['value']
}

class TextArea extends AutoControlledComponent<WithAsProp<TextAreaProps>, TextAreaState> {
  static className = 'ui-textarea'

  static displayName = 'TextArea'

  static slotClassNames: TextAreaSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    as: 'textarea',
    accessibility: textAreaBehavior,
  }

  static autoControlledProps = ['value']

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }: RenderResultConfig<TextAreaProps>) {
    const { placeholder, maxLength, disabled } = this.props
    const { value = '' } = this.state

    return (
      <ElementType
        value={value}
        className={TextArea.slotClassNames.textArea}
        styles={styles.textArea}
        onChange={this.handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.textArea, unhandledProps)}
      />
    )
  }

  handleChange = (e: React.ChangeEvent | React.FormEvent) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.setState({ value })
  }
}

TextArea.slotClassNames = {
  textArea: `${TextArea.className}__textarea`,
}

export default withSafeTypeForAs<typeof TextArea, TextAreaProps, 'div'>(TextArea)
