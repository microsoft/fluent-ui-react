import * as React from 'react'
import * as PropTypes from 'prop-types'

import { createHTMLInput, customPropTypes, AutoControlledComponent } from '../../lib'
import Label from '../Label'
import { ComponentEventHandler, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface IRadioProps {
  as?: any
  checked?: boolean
  children?: ReactChildren
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  label?: string
  onChange?: ComponentEventHandler<IRadioProps>
  type?: string
  styles?: IComponentPartStylesInput
  value?: string | number
  variables?: ComponentVariablesInput
}

/**
 * @accessibility
 * This is shown at the top.
 */
class Radio extends AutoControlledComponent<Extendable<IRadioProps>, any> {
  static displayName = 'Radio'

  static className = 'ui-radio'

  static propTypes = {
    as: customPropTypes.as,

    /** Whether or not checkbox is checked. */
    checked: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checked value. */
    defaultChecked: PropTypes.bool,

    /** A radio can appear disabled and be unable to change states */
    disabled: PropTypes.bool,

    /** The label of the radio input. */
    label: PropTypes.string,

    /**
     * Called after radio is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onChange: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The HTML input type. */
    type: PropTypes.string,

    /** The HTML input value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'checked',
    'children',
    'className',
    'defaultChecked',
    'disabled',
    'label',
    'onChange',
    'styles',
    'type',
    'value',
    'variables',
  ]

  static autoControlledProps = ['checked']

  static defaultProps = {
    as: 'div',
    type: 'radio',
  }

  private handleChange = (e: React.SyntheticEvent) => {
    const { onChange, disabled } = this.props
    const { checked } = this.state

    if (disabled) {
      e.preventDefault()
      return
    }

    if (onChange) {
      onChange(e, { ...this.props, checked: !checked })
    }

    this.trySetState({ checked: !checked })
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { type, label, disabled, value } = this.props
    const { checked } = this.state

    return (
      <ElementType {...rest} className={classes.root}>
        <Label as="label" styles={{ root: styles.label }}>
          {createHTMLInput(type, {
            defaultProps: {
              checked,
              disabled,
              value,
              onChange: this.handleChange,
            },
            overrideProps: {
              className: classes.radio,
            },
          })}
          {label}
        </Label>
      </ElementType>
    )
  }
}

export default Radio
