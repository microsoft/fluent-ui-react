import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createHTMLInput,
  customPropTypes,
  AutoControlledComponent,
  createShorthandFactory,
} from '../../lib'
import Label from '../Label'
import { ComponentEventHandler, Extendable, ReactChildren } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import Icon from '../Icon/Icon'

export interface IRadioProps {
  as?: any
  checked?: boolean
  children?: ReactChildren
  className?: string
  disabled?: boolean
  label?: string
  name?: string
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
  static create: Function

  static displayName = 'Radio'

  static className = 'ui-radio'

  static propTypes = {
    as: customPropTypes.as,

    /** Whether or not radio is checked. */
    checked: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial checked value. */
    defaultChecked: PropTypes.bool,

    /** A radio can appear disabled and be unable to change states. */
    disabled: PropTypes.bool,

    /** The label of the radio input. */
    label: PropTypes.string,

    /** The HTML input name. */
    name: PropTypes.string,

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
    'name',
    'onChange',
    'styles',
    'type',
    'value',
    'variables',
  ]

  static defaultProps = {
    as: 'div',
    type: 'radio',
  }

  static autoControlledProps = ['checked']

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

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { type, label, disabled, value, name, icon } = this.props
    const { checked } = this.state

    const iconParam = Icon.create(icon || '', {
      defaultProps: {
        circular: true,
        size: 'mini',
        variables: {
          color: checked ? variables.checkedIconColor : variables.uncheckedIconColor,
          backgroundColor: checked
            ? variables.checkedIconBackgroundColor
            : variables.uncheckedIconBackgroundColor,
          borderColor: checked
            ? variables.checkedIconBorderColor
            : variables.uncheckedIconBorderColor,
        },
      },
    })

    const contentParam = (
      <React.Fragment>
        {createHTMLInput(type, {
          defaultProps: {
            checked,
            disabled,
            value,
            name,
            onChange: this.handleChange,
          },
          overrideProps: {
            className: classes.radio,
          },
        })}
        {label}
      </React.Fragment>
    )

    return (
      <ElementType {...rest} className={classes.root}>
        <Label
          as="label"
          styles={{ root: styles.label }}
          iconPosition="start"
          icon={iconParam}
          content={contentParam}
        />
      </ElementType>
    )
  }
}

Radio.create = createShorthandFactory(Radio, label => ({ label }))

export default Radio
