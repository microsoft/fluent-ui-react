import { Accessibility } from '../../lib/accessibility/types'
import { ShorthandValue, ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'
import Box, { BoxProps } from '../Box/Box'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import {
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  RenderResultConfig,
  AutoControlledComponent,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { textAreaBehavior } from '../../lib/accessibility'
import * as _ from 'lodash'

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

  /** Shorthand for the text area component. */
  textArea?: ShorthandValue<BoxProps>

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange?: ComponentEventHandler<TextAreaProps & { value: string }>

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
    textArea: customPropTypes.itemShorthand,
    onChange: PropTypes.func,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: textAreaBehavior,
    textArea: {},
  }

  static autoControlledProps = ['value']

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
    variables,
  }: RenderResultConfig<TextAreaProps>) {
    const { textArea, placeholder, maxLength, disabled } = this.props
    const { value = '' } = this.state

    return Box.create(textArea, {
      defaultProps: {
        as: 'textarea',
        value,
        className: TextArea.slotClassNames.textArea,
        styles: styles.textArea,
        onChange: this.handleChange,
        placeholder,
        maxLength,
        disabled,
        ...unhandledProps,
        ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.textArea, unhandledProps),
      },
    })
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.setState({ value })
  }
}

TextArea.slotClassNames = {
  textArea: `${TextArea.className}__input`,
}

export default withSafeTypeForAs<typeof TextArea, TextAreaProps, 'div'>(TextArea)
