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

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
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
    const { disabled } = this.props
    const { value = '' } = this.state

    return (
      <ElementType
        value={value}
        className={classes.root}
        onChange={this.handleChange}
        disabled={disabled}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      />
    )
  }

  handleChange = (e: React.ChangeEvent | React.FormEvent) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })
    this.setState({ value })
  }
}

/**
 * A TextArea is a multi-line plan-text editing control.
 *
 * @accessibility
 * For good screen reader experience set `aria-label` or `aria-labelledby` attribute for textarea.
 */
export default withSafeTypeForAs<typeof TextArea, TextAreaProps, 'textarea'>(TextArea)
